const { Client, GatewayIntentBits, Partials, EmbedBuilder } = require("discord.js");
const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");
const { DeezerPlugin } = require("@distube/deezer");
const { YtDlpPlugin } = require("@distube/yt-dlp");
const { editedChannelId, deletedChannelId } = require("./config.js");
const config = require("./config.js");
const fs = require("fs");
const mongoDB = require("../mongoDB");

const client = new Client({
    partials: [
        Partials.Channel, // for text channel
        Partials.GuildMember, // for guild member
        Partials.User // for discord user
    ],
    intents: [
        GatewayIntentBits.Guilds, // for guild related things
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers, // for guild members related things
        GatewayIntentBits.GuildIntegrations, // for discord Integrations
        GatewayIntentBits.GuildVoiceStates // for voice related things
    ]
});

client.config = config;
client.player = new DisTube(client, {
    leaveOnStop: config.opt.voiceConfig.leaveOnStop,
    leaveOnFinish: config.opt.voiceConfig.leaveOnFinish,
    emitNewSongOnly: true,
    emitAddSongWhenCreatingQueue: false,
    emitAddListWhenCreatingQueue: false,
    plugins: [new SpotifyPlugin(), new SoundCloudPlugin(), new YtDlpPlugin(), new DeezerPlugin()]
});

const player = client.player;
client.language = config.language || "en";
let lang = require(`./languages/${config.language || "en"}.js`);

fs.readdir("./events", (_err, files) => {
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        console.log(`${lang.loadclientevent}: ${eventName}`);
        client.on(eventName, event.bind(null, client));
        delete require.cache[require.resolve(`./events/${file}`)];
    });
});

fs.readdir("./events/player", (_err, files) => {
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        const playerEvents = require(`./events/player/${file}`);
        let playerName = file.split(".")[0];
        console.log(`${lang.loadevent}: ${playerName}`);
        player.on(playerName, playerEvents.bind(null, client));
        delete require.cache[require.resolve(`./events/player/${file}`)];
    });
});

client.commands = [];
fs.readdir(config.commandsDir, (err, files) => {
    if (err) throw err;
    files.forEach(async file => {
        try {
            if (file.endsWith(".js")) {
                let command = require(`${config.commandsDir}/${file}`);
                client.commands.push({
                    name: command.name,
                    description: command.description,
                    options: command.options
                });
                console.log(`${lang.loadcmd}: ${command.name}`);
            }
        } catch (err) {
            console.log(err);
        }
    });
});

// * LOG MESSAGE DELETION
client.on("messageDelete", async message => {
    const msgDeleteEmbed = new EmbedBuilder()
        .setColor(0xff0000)
        .setTitle("Message Delete")
        .setAuthor({
            name: `${message.author.username}`,
            iconURL: message.author.displayAvatarURL()
        })
        .addFields({ name: "Content", value: `> ${message.content}` })
        .addFields({ name: "Channel", value: `<#${message.channel.id}>` })
        .addFields(
            {
                name: "Username",
                value: `<@${message.author.id}>`,
                inline: true
            },
            { name: "User ID", value: message.author.id, inline: true },
            { name: "Message ID", value: message.id, inline: true }
            // message.author.username
        );

    message.attachments.forEach(attachment => {
        msgDeleteEmbed.addFields({ name: "Attachment", value: attachment.url });
    });

    msgDeleteEmbed.setTimestamp().setFooter({ text: client.user.username });

    const channel = await client.channels.fetch(deletedChannelId);
    channel.send({
        content: `DELETE: \`${message.author.username}\` (${message.author.id})`,
        embeds: [msgDeleteEmbed]
    });
});

// * LOG MESSAGE EDIT
client.on("messageUpdate", async (oldMessage, newMessage) => {
    const msgEditEmbed = new EmbedBuilder()
        .setColor(0x0000ff)
        .setTitle("Message Edit")
        .setAuthor({
            name: `${oldMessage.author.username}`,
            iconURL: oldMessage.author.displayAvatarURL()
        })
        .addFields({ name: "Old Content", value: `> ${oldMessage.content}` })
        .addFields({ name: "New Content", value: `> ${newMessage.content}` })
        .addFields({ name: "Channel", value: `<#${oldMessage.channel.id}>` })
        .addFields(
            { name: "Username", value: `<@${oldMessage.author.id}>`, inline: true },
            { name: "User ID", value: oldMessage.author.id, inline: true },
            { name: "Message ID", value: oldMessage.id, inline: true }
            // oldMessage.author.username
        );

    oldMessage.attachments.forEach(attachment => {
        msgEditEmbed.addFields({ name: "Attachment", value: attachment.url });
    });

    msgEditEmbed.setTimestamp().setFooter({ text: client.user.username });

    const channel = await client.channels.fetch(editedChannelId);
    channel.send({
        content: `EDIT: \`${oldMessage.author.username}\` (${oldMessage.author.id})`,
        embeds: [msgEditEmbed]
    });
});

if (config.TOKEN || process.env.TOKEN) {
    client.login(config.TOKEN || process.env.TOKEN).catch(e => {
    console.log(lang.error1);
});
} else {
    setTimeout(() => {
        console.log(lang.error2);
    }, 2000);
}

const removeOldDocuments = async () => {
    try {
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        await mongoDB.snipe.deleteMany({ createdAt: { $lt: twentyFourHoursAgo } });
        console.log("Old documents removed successfully.");
    } catch (error) {
        console.error("Error removing old documents:", error);
    }
};

const scheduleRemoval = () => {
    const now = new Date();
    const nextMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
    const timeUntilMidnight = nextMidnight - now;

    setTimeout(() => {
        removeOldDocuments();
        setInterval(removeOldDocuments, 24 * 60 * 60 * 1000); // Repeat every 24 hours
    }, timeUntilMidnight);
};

if (config.mongodbURL || process.env.MONGO) {
    const mongoose = require("mongoose");
    mongoose
        .connect(config.mongodbURL || process.env.MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(async () => {
            scheduleRemoval();
            console.log(`Connected MongoDB`);
        })
        .catch(err => {
            console.log("\nMongoDB Error: " + err + "\n\n" + lang.error4);
        });
} else {
    console.log(lang.error4);
}

const express = require("express");
const app = express();
app.get("/", (_request, response) => {
    response?.sendStatus(200);
});
app.listen(process?.env?.PORT);

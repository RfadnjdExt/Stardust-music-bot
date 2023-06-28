const { Client, GatewayIntentBits, Partials, EmbedBuilder, embedLength } = require("discord.js");
const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");
const { DeezerPlugin } = require("@distube/deezer");
const { YtDlpPlugin } = require("@distube/yt-dlp");
const { editedChannelId, deletedChannelId } = require("./config.js")
const config = require("./config.js");
const fs = require("fs");
const client = new Client({
    partials: [
        Partials.Channel, // for text channel
        Partials.GuildMember, // for guild member
        Partials.User, // for discord user
    ],
    intents: [
        GatewayIntentBits.Guilds, // for guild related things
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers, // for guild members related things
        GatewayIntentBits.GuildIntegrations, // for discord Integrations
        GatewayIntentBits.GuildVoiceStates, // for voice related things
    ],
});

client.config = config;
client.player = new DisTube(client, {
    leaveOnStop: config.opt.voiceConfig.leaveOnStop,
    leaveOnFinish: config.opt.voiceConfig.leaveOnFinish,
    emitNewSongOnly: true,
    emitAddSongWhenCreatingQueue: false,
    emitAddListWhenCreatingQueue: false,
    plugins: [
        new SpotifyPlugin(),
        new SoundCloudPlugin(),
        new YtDlpPlugin(),
        new DeezerPlugin(),
    ],
});

const player = client.player;
client.language = config.language || "en";
let lang = require(`./languages/${config.language || "en"}.js`);

fs.readdir("./events", (_err, files) => {
    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        console.log(`${lang.loadclientevent}: ${eventName}`);
        client.on(eventName, event.bind(null, client));
        delete require.cache[require.resolve(`./events/${file}`)];
    });
});

fs.readdir("./events/player", (_err, files) => {
    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        const player_events = require(`./events/player/${file}`);
        let playerName = file.split(".")[0];
        console.log(`${lang.loadevent}: ${playerName}`);
        player.on(playerName, player_events.bind(null, client));
        delete require.cache[require.resolve(`./events/player/${file}`)];
    });
});

client.commands = [];
fs.readdir(config.commandsDir, (err, files) => {
    if (err) throw err;
    files.forEach(async (f) => {
        try {
            if (f.endsWith(".js")) {
                let props = require(`${config.commandsDir}/${f}`);
                client.commands.push({
                    name: props.name,
                    description: props.description,
                    options: props.options,
                });
                console.log(`${lang.loadcmd}: ${props.name}`);
            }
        } catch (err) {
            console.log(err);
        }
    });
});

// * LOG MESSAGE DELETION
client.on('messageDelete', async (message) => {
    const msgDeleteEmbed = new EmbedBuilder()
        .setColor(0xff0000)
        .setTitle('Message Delete')
        .setAuthor({
            name: `${message.author.username}`,
            iconURL: message.author.displayAvatarURL()
        })
        .addFields(
            { name: 'Content', value: `> ${message.content}` },
        )
        .addFields(
            { name: 'Channel', value: `<#${message.channel.id}>`}
        )
        .addFields(
            { name: 'Username', value: `<@${message.author.id}>`, inline: true },
            { name: 'User ID', value: message.author.id, inline: true },
            { name: 'Message ID', value: message.id, inline: true }
            // message.author.username
        );

    if (message.content.length > 0) {
        msgDeleteEmbed.setDescription(`Message Content:\n${message.content}`)
    }

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
client.on('messageUpdate', async (oldMsg, newMsg) => {
    const msgEditEmbed = new EmbedBuilder()
        .setColor(0x0000ff)
        .setTitle('Message Edit')
        .setAuthor({ 
            name: `${oldMsg.author.username}`,
            iconURL: oldMsg.author.displayAvatarURL()
        })
        .addFields(
            { name: 'Old Content', value: `> ${oldMsg.content}` },
        )
        .addFields(
            { name: 'New Content', value: `> ${newMsg.content}`}
        )
        .addFields(
            { name: 'Channel', value: `<#${oldMsg.channel.id}>`}
        )
        .addFields(
            { name: 'Username', value: `<@${oldMsg.author.id}>`, inline: true },
            { name: 'User ID', value: oldMsg.author.id, inline: true },
            { name: 'Message ID', value: oldMsg.id, inline: true },
            // oldMsg.author.username
        );

    if (oldMsg.content.length > 0) {
        msgEditEmbed.setDescription(`Message Content:\n${oldMsg.content}`);
    }

    oldMsg.attachments.forEach(attachment => {
        msgEditEmbed.addFields({ name: "Attachment", value: attachment.url });
    });

    msgEditEmbed.setTimestamp().setFooter({ text: client.user.username });

    const channel = await client.channels.fetch(editedChannelId);
    channel.send({
        content: `EDIT: \`${oldMsg.author.username}\` (${oldMsg.author.id})`,
        embeds: [msgEditEmbed]
    });
})

if (config.TOKEN || process.env.TOKEN) {
    client.login(config.TOKEN || process.env.TOKEN).catch((e) => {
        console.log(lang.error1);
    });
} else {
    setTimeout(() => {
        console.log(lang.error2);
    }, 2000);
}

if (config.mongodbURL || process.env.MONGO) {
    const mongoose = require("mongoose");
    mongoose
        .connect(config.mongodbURL || process.env.MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(async () => {
            console.log(`Connected MongoDB`);
        })
        .catch((err) => {
            console.log("\nMongoDB Error: " + err + "\n\n" + lang.error4);
        });
} else {
    console.log(lang.error4);
}

const express = require("express");
const app = express();
const http = require("http");
const { attachment } = require("express/lib/response.js");
app.get("/", (request, response) => {
    response?.sendStatus(200);
});
app.listen(process?.env?.PORT);

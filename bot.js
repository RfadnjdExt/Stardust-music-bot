const fs = require("fs/promises");
const mongoose = require("mongoose");
const config = require("./config.js");
const { DisTube } = require("distube");
const { YtDlpPlugin } = require("@distube/yt-dlp");
const { DeezerPlugin } = require("@distube/deezer");
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");
const lang = require(`./languages/${config.language || "en"}.js`);
const { Client, GatewayIntentBits, Partials } = require("discord.js");

const discordClient = new Client({
    partials: [Partials.Channel, Partials.GuildMember, Partials.User],
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildVoiceStates
    ]
});

discordClient.config = config;
discordClient.player = new DisTube(discordClient, {
    leaveOnStop: config.opt.voiceConfig.leaveOnStop,
    leaveOnFinish: config.opt.voiceConfig.leaveOnFinish,
    emitNewSongOnly: true,
    emitAddSongWhenCreatingQueue: false,
    emitAddListWhenCreatingQueue: false,
    plugins: [new SpotifyPlugin(), new SoundCloudPlugin(), new YtDlpPlugin(), new DeezerPlugin()]
});

discordClient.language = config.language || "en";

if (config.mongodbURL || process.env.MONGO) {
    mongoose
        .connect(config.mongodbURL || process.env.MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(async () => {
            console.log(`Connected MongoDB`);
        })
        .catch(err => {
            console.log("\nMongoDB Error: " + err + "\n\n" + lang.error4);
        });
} else {
    console.log(lang.error4);
}

const loadEventsRecursive = async (dirPath, eventNamePrefix) => {
    try {
        const files = await fs.readdir(dirPath);
        for (const file of files) {
            const filePath = `${dirPath}/${file}`;
            const fileStat = await fs.stat(filePath);
            if (fileStat.isDirectory()) {
                await loadEventsRecursive(filePath, eventNamePrefix);
            } else if (file.endsWith(".js")) {
                const event = require(filePath);
                const eventName = file.split(".")[0];
                console.log(`${eventNamePrefix}: ${eventName}`);
                discordClient.on(eventName, event.bind(null, discordClient));
                delete require.cache[require.resolve(filePath)];
            }
        }
    } catch (err) {
        console.error("Error loading events:", err);
    }
};

loadEventsRecursive("./events", lang.loadclientevent);

discordClient.commands = [];
const loadCommandsRecursive = async dirPath => {
    try {
        const files = await fs.readdir(dirPath);
        for (const file of files) {
            const filePath = `${dirPath}/${file}`;
            const fileStat = await fs.stat(filePath);
            if (fileStat.isDirectory()) {
                await loadCommandsRecursive(filePath);
            } else if (file.endsWith(".js")) {
                const command = require(filePath);
                discordClient.commands.push({
                    name: command.name,
                    description: command.description,
                    options: command.options
                });
                console.log(`${lang.loadcmd}: ${command.name}`);
            }
        }
    } catch (err) {
        console.error("Error loading commands:", err);
    }
};

loadCommandsRecursive(config.commandsDir);

discordClient.login(config.TOKEN || process.env.TOKEN).catch(e => {
    console.log(lang.error1);
});

const express = require("express");
const app = express();
app.get("/", (_request, response) => {
    response?.sendStatus(200);
});
app.listen(process?.env?.PORT);

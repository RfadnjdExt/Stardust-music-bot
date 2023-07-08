const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const musicbot = Schema({
    guildID: String,
    role: String,
    language: String,
    channels: Array
});

const playlist = Schema({
    userID: String,
    playlist: Array,
    musics: Array
});

const snipe = Schema(
    {
        messageContent: String
    },
    { timestamps: true }
);

const db = mongoose.connection;

db.once("open", () => {
    console.log("Koneksi berhasil!");
});

db.on("error", err => {
    console.error("Koneksi gagal!", err);
});

module.exports = {
    snipe: model("snipe", snipe),
    musicbot: model("musicbot", musicbot),
    playlist: model("playlist", playlist)
};

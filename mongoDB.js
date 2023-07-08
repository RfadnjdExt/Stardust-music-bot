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

const mongoUrl = "mongodb://localhost:27017/mydatabase";

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

const db = mongoose.connection;

db.once("open", () => {
    console.log("Koneksi berhasil!");
});

db.on("error", err => {
    console.error("Koneksi gagal!", err);
});

module.exports = {
    musicbot: model("musicbot", musicbot),
    playlist: model("playlist", playlist),
    connectToDB: function () {
        mongoose.connect(mongoUrl, options);
    }
};

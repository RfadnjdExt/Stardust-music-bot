const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const db = require("../mongoDB");

module.exports = {
    options: [
        {
            choices: [
                { name: "Honkai: Star Rail", value: "star-rail" },
                { name: "Genshin Impact", value: "genshin" },
            ],
            type: 3,
            name: "permainan",
            description: "Pilih permainan untuk tanda tangan harian",
            required: true,
        },
    ],
    name: "hoyodaily",
    description: "Tanda tangan harian di Hoyolab",
    showHelp: true,
    // async execute(interaction) {
    run: async (interaction) => {
        const game = interaction.options.getString("permainan");

        const profile = await db.getProfile(interaction.user.id);
        const cookie = `ltuid=${profile.cookie.ltuid}; ltoken=${profile.cookie.ltoken}`;
        const urlDict = {
            genshin:
                "https://webstatic-sea.mihoyo.com/ys/event/signin-sea/index.html?act_id=e202102251931481",
            "star-rail":
                "https://webstatic.mihoyo.com/app/community-shop/index.html?#!/evt_info/azaocr803",
            hi3: "https://webstatic.mihoyo.com/bh3/event/e20211029sign/index.html",
        };
        const url = urlDict[game];

        if (!url) {
            return await interaction.reply(
                `Maaf, saya tidak mengenali permainan ${game}.`
            );
        }

        // Mengambil cookie dan mengirim permintaan HTTP untuk mengonfirmasi tanda tangan harian
        const response = await fetch(url, {
            headers: {
                cookie: cookie,
            },
        });

        // Menangani respons dari server
        let html = await response.text();

        if (html.includes("已经签到过了哦")) {
            return await interaction.reply("Kamu sudah tanda tangan hari ini!");
        }

        const rewards = html.match(
            /(?<=<span class="info-title ellipses">).+?(?=<\/span>)/g
        );
        const messageEmbed = new MessageEmbed();
        messageEmbed
            .setColor("#00ff00")
            .setTitle(`Berhasil tanda tangan harian ${game}!`)
            .setDescription(
                `Kamu berhasil tanda tangan harian ${game}. Berikut adalah hadiah yang kamu terima:`
            )
            .addFields(
                rewards.map((reward) => {
                    return { name: "\u200b", value: reward };
                })
            );
        await interaction.reply({ embeds: [messageEmbed] });
    },
};

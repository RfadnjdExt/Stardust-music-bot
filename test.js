const { SlashCommandBuilder } = require("discord.js");
console.log(
    JSON.stringify(
        new SlashCommandBuilder()
            .setName("hoyodaily")
            .setDescription("Tanda tangan harian di Hoyolab")
            .addStringOption((option) =>
                option
                    .setName("permainan")
                    .setDescription("Pilih permainan untuk tanda tangan harian")
                    .setRequired(true)
                    .addChoices(
                        {
                            name: "Honkai: Star Rail",
                            value: "star-rail",
                        },
                        {
                            name: "Genshin Impact",
                            value: "genshin",
                        }
                    )
            )
            .toJSON()
    )
);

const { SlashCommandBuilder } = require('discord.js');
const db = require("../mongoDB");
const numTargets = 5

module.exports = {
    data: new SlashCommandBuilder()
        .setName("snipe")
        .setDescription("Enter list of people being snipe (don't need to select all options)!")
        .addAttachmentOption(option => option.setName('image').setDescription("Snipe image").setRequired(true))
        .addUserOption(option => option.setName('target1').setDescription("Target").setRequired(true)),
        name: "snipe",
        description: "Enter list of people being snipe (don't need to select all options)!",

    async execute(interaction) {
        let sniperID = interaction.user;
        let targetID = [];
        let image = interaction.options.getAttachment("image");

        try {
            const numTargets = interaction.options.getUsers("target").size;
            for (let i = 0; i < numTargets; i++) {
                const user = interaction.options.getUser(`target${i+1}`);
                if (user == undefined) {
                    continue;
                }

                if (user.id === "454223855607742474") {
                    await interaction.reply({content: "Unfortunately, you can't snipe the bot ;-;", ephemeral: true});
                    return;
                }

                if (user.id === sniperID.id) {
                    await interaction.reply({content: "Sniping yourself sounds like a bad time ;-;", ephemeral: true});
                    return;
                }
                targetID.push(user);
            }
        } catch (error) {
            console.log(error);
            return;
        }
        targetID = [...new Set(targetID)];

        await interaction.deferReply();
        const message = await interaction.editReply({
            content: `${buildTargetString(targetID)} just got sniped by ${sniperID}. (If you're a target, please confirm the snipe by reacting)`,
            files: [image],
            fetchReply: true
        });

        snipeOnReact(message, sniperID, ...targetID);
    },
};
const mongoDB = require("../mongoDB");
const { ButtonBuilder, ButtonStyle, EmbedBuilder, ActionRowBuilder } = require("discord.js");
const crypto = require("crypto");

const filterInteractionUser = interaction => interaction.user.id === interaction.user.id;

const generateButtonCustomID = () => crypto.randomBytes(8).toString("hex");

module.exports = {
    name: "snipe",
    description: "Retrieve the most recently deleted message in the channel.",
    permissions: "",
    run: async (_client, interaction) => {
        const snipeData = await mongoDB.snipe.find();
        console.log(snipeData);
        let currentPage = 1;
        const previousButtonCustomID = generateButtonCustomID();
        const nextButtonCustomID = generateButtonCustomID();

        const createEmbedAndButtons = () => {
            const embedDescription = new EmbedBuilder().setDescription(snipeData[currentPage - 1].messageContent);
            const buttons = [];

            if (currentPage > 1) {
                buttons.push(
                    new ButtonBuilder().setCustomId(previousButtonCustomID).setEmoji("◀").setStyle(ButtonStyle.Primary)
                );
            }

            if (currentPage !== snipeData.length) {
                buttons.push(
                    new ButtonBuilder().setCustomId(nextButtonCustomID).setEmoji("▶").setStyle(ButtonStyle.Primary)
                );
            }

            const actionRow = new ActionRowBuilder();
            buttons.forEach(button => actionRow.addComponents(button));

            return { components: [actionRow], embeds: [embedDescription] };
        };

        const embedAndButtons = createEmbedAndButtons();

        interaction.reply(embedAndButtons).then(async reply => {
            const messageCollector = reply.createMessageComponentCollector({
                filter: filterInteractionUser,
                time: 6e4
            });

            messageCollector.on("collect", async collectedInteraction => {
                if (collectedInteraction.customId === previousButtonCustomID) {
                    currentPage--;
                } else if (collectedInteraction.customId === nextButtonCustomID) {
                    currentPage++;
                }

                const newEmbedAndButtons = createEmbedAndButtons();
                await interaction.editReply(newEmbedAndButtons);
                await collectedInteraction.deferUpdate();
            });
        });
    }
};

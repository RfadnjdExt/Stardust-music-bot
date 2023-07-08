const db = require("../mongoDB");

module.exports = {
    name: "snipe",
    description: "Retrieve the most recently deleted message in the channel.",
    permissions: "",
    run: async (client, interaction) => {
        const message = await db.snipe.findOne();
        await interaction.reply({ content: message.messageContent });
    }
};

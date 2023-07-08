const db = require("../mongoDB");
const { EmbedBuilder } = require("discord.js");
const { deletedChannelId } = require("../config.js");

module.exports = async (client, message) => {
    await db.snipe.create({ messageContent: message.content });
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
};

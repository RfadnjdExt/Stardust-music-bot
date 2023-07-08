const { EmbedBuilder } = require("discord.js");
const { editedChannelId } = require("../config.js");

module.exports = async (client, oldMessage, newMessage) => {
    const msgEditEmbed = new EmbedBuilder()
        .setColor(0x0000ff)
        .setTitle("Message Edit")
        .setAuthor({
            name: `${oldMessage.author.username}`,
            iconURL: oldMessage.author.displayAvatarURL()
        })
        .addFields({ name: "Old Content", value: `> ${oldMessage.content}` })
        .addFields({ name: "New Content", value: `> ${newMessage.content}` })
        .addFields({ name: "Channel", value: `<#${oldMessage.channel.id}>` })
        .addFields(
            { name: "Username", value: `<@${oldMessage.author.id}>`, inline: true },
            { name: "User ID", value: oldMessage.author.id, inline: true },
            { name: "Message ID", value: oldMessage.id, inline: true }
            // oldMessage.author.username
        );

    oldMessage.attachments.forEach(attachment => {
        msgEditEmbed.addFields({ name: "Attachment", value: attachment.url });
    });

    msgEditEmbed.setTimestamp().setFooter({ text: client.user.username });

    const channel = await client.channels.fetch(editedChannelId);
    channel.send({
        content: `EDIT: \`${oldMessage.author.username}\` (${oldMessage.author.id})`,
        embeds: [msgEditEmbed]
    });
};

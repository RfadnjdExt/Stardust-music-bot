const { SlashCommandBuilder } = require("discord.js");
const { client } = require("../index.js"); // Assuming you have a Discord.js client defined in your index.js file
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "snipe",
  description: "Snipe deleted messages.",
  options: [],
  permissions: "0x0000000000000800",
  run: async (client, messageDelete) => {
    try {
      let Guilds;
      let GuildMessages;
      let MessageContent;
      let GuildMembers;

      const msgDeleteEmbed = new MessageEmbed()
        .setColor(0xff0000)
        .setTitle("Message Delete")
        .setAuthor({
          name: `${message.author.username}`,
          iconURL: message.author.displayAvatarURL(),
        })
        .addFields({ name: "Content", value: `> ${messageDelete.content}` })
        .addFields({ name: "Channel", value: `<#${messageDelete.channel.id}>` })
        .addFields(
          {
            name: "Username",
            value: `<@${messageDelete.author.id}>`,
            inline: true,
          },
          { name: "User ID", value: messageDelete.author.id, inline: true },
          { name: "Message ID", value: messageDelete.id, inline: true }
        );

      messageDelete.attachments.forEach((attachment) => {
        msgDeleteEmbed.addFields({ name: "Attachment", value: attachment.url });
      });

      msgDeleteEmbed.setTimestamp().setFooter(client.user.username);

      return messageDelete.channel.send({ embeds: [msgDeleteEmbed] });
    } catch (e) {
      const errorNotifer = require("../functions.js");
      errorNotifer(client, interaction, e, lang);
    }
  },
};

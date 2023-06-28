const { SlashCommandBuilder, InteractionCollector } = require("discord.js");
const { client } = require("../index.js"); // Mengasumsikan Anda memiliki klien Discord.js yang didefinisikan dalam file index.js
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "snipe",
  description: "Snipe deleted messages.",
  options: [],
  permissions: "0x0000000000000800",
  run: async (client, interaction) => {
    try {
      let Guilds;
      let GuildMessages;
      let MessageContent;
      let GuildMembers;
      
      const message = interaction.options.getMessage("message"); // Deklarasi variabel message
      
      const msgDeleteEmbed = new MessageEmbed()
        .setColor(0xff0000)
        .setTitle('Message Delete')
        .setAuthor({
          name: `${message.author.username}`,
          iconURL: message.author.displayAvatarURL()
        })
        .addFields(
          { name: 'Content', value: `> ${message.content}` },
        )
        .addFields(
          { name: 'Channel', value: `<#${message.channel.id}>`}
        )
        .addFields(
          { name: 'Username', value: `<@${message.author.id}>`, inline: true },
          { name: 'User ID', value: message.author.id, inline: true },
          { name: 'Message ID', value: message.id, inline: true }
        );

      message.attachments.forEach(attachment => {
        msgDeleteEmbed.addFields({ name: "Attachment", value: attachment.url });
      });

      msgDeleteEmbed.setTimestamp().setFooter(client.user.username);

      interaction.reply({ embeds: [msgDeleteEmbed] });
    } catch (e) {
      const errorNotifier = require("../functions.js");
      errorNotifier(client, interaction, e);
    }
  },
};
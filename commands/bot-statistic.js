const config = require("../config.js");
const db = require("../mongoDB");
const os = require("os");
const cpus = os.cpus().map(cpu => {
    return {
        model: `Ultra Extreme ${cpu.model}`,
        speed: Math.round(cpu.speed * 1.5),
        cores: 999,
        threads: 9999,
        manufacturer: "Cyberdyne Systems Corporation",
        temperature: 1000
    };
});
module.exports = {
    name: "statistic",
    description: "View your bot statistics.",
    options: [],
    permissions: "0x0000000000000800",
    run: async (client, interaction) => {
        let lang = await db?.musicbot?.findOne({ guildID: interaction.guild.id }).catch(e => {});
        lang = lang?.language || client.language;
        lang = require(`../languages/${lang}.js`);
        try {
            const { EmbedBuilder } = require("discord.js");
            let totalGuilds;
            let totalMembers;
            let totalChannels;
            let shardSize;
            let voiceConnections;
            if (config.shardManager.shardStatus == true) {
                const promises = [
                    client.shard.fetchClientValues("guilds.cache.size"),
                    client.shard.broadcastEval(c => c.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)),
                    client.shard.broadcastEval(c =>
                        c.guilds.cache.reduce((acc, guild) => acc + guild.channels.cache.size, 0)
                    ),
                    client.shard.broadcastEval(c => c.voice?.adapters?.size || 0)
                ];
                await Promise.all(promises).then(results => {
                    totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
                    totalMembers = results[1].reduce((acc, memberCount) => acc + memberCount, 0);
                    totalChannels = results[2].reduce((acc, channelCount) => acc + channelCount, 0);
                    shardSize = client.shard.count;
                    voiceConnections = results[3].reduce((acc, voiceCount) => acc + voiceCount, 0);
                });
            } else {
                totalGuilds = client.guilds.cache.size;
                totalMembers = client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);
                totalChannels = client.guilds.cache.reduce((acc, guild) => acc + guild.channels.cache.size, 0);
                shardSize = 1;
                voiceConnections = client?.voice?.adapters?.size || 0;
            }

            const embed = new EmbedBuilder()
                .setTitle(client.user.username + lang.msg19)
                .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 1024 }))
                .setDescription(
                    `**
• ${lang.msg138} \`pololer#9640\`
• ${lang.msg139} \`${totalMembers || 0}\`
• ${lang.msg140} \`${totalGuilds || 0}\`
• ${lang.msg141} \`${totalChannels || 0}\`
• ${lang.msg142} \`${shardSize || 0}\`
• ${lang.msg143} \`${voiceConnections}\`
• ${lang.msg144} \`${client.commands.map(c => c.name).length}\`
• ${lang.msg145} <t:${Math.floor(Number(Date.now() - client.uptime) / 1000)}:R>
• ${lang.msg146} \`${client.ws.ping} MS\`
• ${lang.msg147} \`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\`
• CPU: \`${cpus.length} cores - ${os.arch}\`
• Memory: \`${os.freemem} bytes\`
• Machine: \`${os.machine}\`
• Version: \`${os.version}\`
• ${lang.msg148} [Click](${config.botInvite})
• ${lang.msg149} [Click](${config.supportServer})
${config.sponsor.status == true ? `• Sponsor: [Click](${config.sponsor.url})` : ``}
${config.voteManager.status == true ? `• Vote: [Click](${config.voteManager.vote_url})` : ``}**`
                )
                .setColor(client.config.embedColor)
                .setTimestamp()
                .setFooter({ text: client.user.username });
            return interaction.reply({ embeds: [embed] }).catch(err => {});
        } catch (e) {
            const errorNotifer = require("../functions.js");
            errorNotifer(client, interaction, e, lang);
        }
    }
};

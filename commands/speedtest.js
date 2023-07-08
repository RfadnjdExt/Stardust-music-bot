const { EmbedBuilder } = require("discord.js");
const speedTest = require("speedtest-net");

module.exports = {
    name: "speedtest",
    description: "Speed hosting bot",
    permissions: "0x0000000000000800",
    run: async (interaction) => {
        const waitingEmbed = new EmbedBuilder()
            .setTitle("Speedtest")
            .setColor(0xffff00)
            .setDescription("The Speedtest is running, please wait a bit.")
            .setThumbnail(
                "https://store-images.s-microsoft.com/image/apps.52586.13510798887693184.740d7baf-50aa-4e26-adec-ae739ac12068.c9ef9495-f245-4367-872b-c5cc7b48841d"
            )
            .setImage("https://b.cdnst.net/images/share-logo.png")
            .setFooter({ text: "This takes approximately 30 seconds." });

        const waitingMessage = await interaction.reply({
            embeds: [waitingEmbed]
        });

        try {
            const speed = await speedTest({ acceptLicense: true });
            const finishEmbed = new EmbedBuilder()
                .setTitle("Speedtest")
                .setColor(0xffff00)
                .setDescription(
                    `The Speedtest is done, here is the result:\nLocal: ${speed.isp} \nServer: ${speed.server.name} | ${speed.server.location} | ID: ${speed.server.id}\nHost: ${speed.server.host}\n Packet-Loss: ${speed.packetLoss}\nIP: ${speed.server.ip}`
                )
                .setFooter({ text: "The used Speedtest is speedtest.net" })
                .setThumbnail(
                    "https://store-images.s-microsoft.com/image/apps.52586.13510798887693184.740d7baf-50aa-4e26-adec-ae739ac12068.c9ef9495-f245-4367-872b-c5cc7b48841d"
                )
                .addFields({ name: "Result", value: speed.result.url })
                .setImage(`${speed.result.url}.png`);

            interaction.editReply({ embeds: [finishEmbed] });
        } catch (error) {
            console.error("Speedtest error:", error);
            const errorEmbed = new EmbedBuilder()
                .setTitle("Speedtest")
                .setColor(0xff0000)
                .setDescription("An error occurred while running the Speedtest. Please try again later.")
                .setFooter({ text: "Error occurred during the Speedtest." });

            interaction.editReply({ embeds: [errorEmbed] });
        }
    }
};

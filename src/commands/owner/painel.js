const { ApplicationCommandType, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const { db , owner , tk } = require("../../database/index");


module.exports = {
    name:"config",
    description:"Config de controle do bot",
    type: ApplicationCommandType.ChatInput,
    run: async(client, interaction) => {
        if(owner !== interaction.user.id) return interaction.reply({content:`Você não tem permissão de usar este comando.`, ephemeral: true });
        const system = await db.get("system");
        interaction.reply({
            embeds: [
                new EmbedBuilder()
                .setAuthor({name: "Painel de Controle", iconURL: client.user.avatarURL()})
                .setDescription(`Cleito Suporte, **${interaction.member.displayName}**! Aqui você pode configurar o seu bot como realmente quiser.`)
                .addFields(
                    {
                        name:"Status:",
                        value:`${system ? "`Ligado`" : "`Desligado`"}`,
                        inline: true
                    },
                    {
                        name:"Cleito Suporte:",
                        value:`\`1.0.0\``,
                        inline: true
                    },
                    {
                        name:"Ping:",
                        value:`\`${client.ws.ping}ms\``,
                        inline: true
                    },
                )
                .setColor("#00FFFF")
            ],
            components: [
                new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId("systemtrueorfalse")
                    .setLabel("Status")
                    .setEmoji("<:eutambmtenho21:1261747649300922551>")
                    .setStyle(3),
                    new ButtonBuilder()
                    .setCustomId("configpanel")
                    .setLabel("Config ticket")
                    .setStyle(1)
                    .setEmoji("<:eutambmtenho23:1261747652949966950>"),
                    new ButtonBuilder()
                    .setCustomId("definition")
                    .setLabel("configurações")
                    .setStyle(1)
                    .setEmoji("<:1182871017396391956:1242872971245129919>")
                )
            ],
            ephemeral: true
        });
    }
}
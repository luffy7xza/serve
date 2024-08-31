const {
  Discord,
  ApplicationCommandType,
  ButtonBuilder,
  ActionRowBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");

const { JsonDatabase } = require("wio.db");


module.exports = {
  name: "blok",
  description: "Bloquea o canal.",
  type: ApplicationCommandType.ChatInput,
  run: async (client, interaction) => {
    if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) return interaction.reply({ content: `Você não tem permissão de \`Administrator (Gerenciar Servidor)\``, ephemeral: true });

    const desblockbutton = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId(`desbloquearcanal`)
        .setLabel(`Desbloquear`)
        .setStyle(2)
    );

    const blockbutton = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId(`bloquearcanal`)
        .setLabel(`Bloquear`)
        .setStyle(2)
    );

    const canal = interaction.channel;

    const mensage = `🔒 Esse canal foi bloqueado por \`${interaction.user.username}\`.`;

    await interaction.channel.permissionOverwrites.edit(interaction.guild.id, {
      SendMessages: false,
    });

    const embdlock = new EmbedBuilder()
      .setColor(0xFF0000) // Vermelho
      .setTitle(`Bloqueio de Canal`)
      .setDescription(mensage)
      .setAuthor({
        name: interaction.guild.name,
        iconURL: interaction.user.avatarURL({ dynamic: true }),
      })
      .setThumbnail(interaction.user.avatarURL({ dynamic: true }))
      .setTimestamp()
      .setFooter({ text: `Bloqueado por ${interaction.user.username}` });

    const initialMessage = await interaction.reply({
      embeds: [embdlock],
      components: [desblockbutton],
    });

    // ------------------------ BOTÃO DESBLOQUEAR ----------------------

    const filter = (i) =>
      i.customId === `desbloquearcanal` && i.user.id === interaction.user.id;

    const collector = interaction.channel.createMessageComponentCollector({
      filter,
    });

    collector.on("collect", async (i) => {
      if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) return interaction.reply({ content: `Você não tem permissão de \`Administrator (Gerenciar Servidor)\``, ephemeral: true });

      await interaction.channel.permissionOverwrites.edit(
        interaction.guild.id,
        { SendMessages: true }
      );

      const mensagemDesbloqueio = `🔓 Esse canal foi desbloqueado por \`${interaction.user.username}\`.`;

      const embedUnlock = new EmbedBuilder()
        .setColor(0x00FF00) // Verde
        .setTitle(`Desbloqueio de Canal`)
        .setDescription(mensagemDesbloqueio)
        .setAuthor({
          name: interaction.guild.name,
          iconURL: interaction.user.avatarURL({ dynamic: true }),
        })
        .setThumbnail(interaction.user.avatarURL({ dynamic: true }))
        .setTimestamp()
        .setFooter({ text: `Desbloqueado por ${interaction.user.username}` });

      await initialMessage.edit({
        embeds: [embedUnlock],
        components: [blockbutton],
      });
    });

    // ------------------------ BOTÃO BLOQUEAR ----------------------

    // Listener para interações de botões

    const filter1 = (i) =>
      i.customId === `bloquearcanal` && i.user.id === interaction.user.id;

    const collector1 = interaction.channel.createMessageComponentCollector({
      filter: filter1,
    });

    collector1.on("collect", async (i) => {
      if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) return interaction.reply({ content: `Você não tem permissão de \`Administrator (Gerenciar Servidor)\``, ephemeral: true });

      await interaction.channel.permissionOverwrites.edit(
        interaction.guild.id,
        { SendMessages: false }
      );

      const mensagemBloqueio = `🔒 Esse canal foi bloqueado  por \`${interaction.user.username}\`.`;

      const embedLock = new EmbedBuilder()
        .setColor(0xFF0000) // Vermelho
        .setTitle(`Bloqueio de Canal`)
        .setDescription(mensagemBloqueio)
        .setAuthor({
          name: interaction.guild.name,
          iconURL: interaction.user.avatarURL({ dynamic: true }),
        })
        .setThumbnail(interaction.user.avatarURL({ dynamic: true }))
        .setTimestamp()
        .setFooter({ text: `Bloqueado por ${interaction.user.username}` });

      await initialMessage.edit({
        embeds: [embedLock],
        components: [desblockbutton],
      });
    });
  },
};

const Discord = require("discord.js")

module.exports = {
  name: "anunciar", // Coloque o nome do comando
  description: "Envie um anuncio de forma personalizada.", // Coloque a descrição do comando
  type: Discord.ApplicationCommandType.ChatInput,

  options: [
    {
        name: "canal",
        description: "🎈 [ADM] Mencione o canal que  anuncio será enviado",
        type: Discord.ApplicationCommandOptionType.Channel,
        required: true
    },
    {
        name: "titulo",
        description: "🎈 [ADM] Escreva um titulo para o anuncio.",
        type: Discord.ApplicationCommandOptionType.String,
        required: true
    },
    {
        name: "desc",
        description: "🎈 [ADM] Escreva uma descrição para o anuncio.",
        type: Discord.ApplicationCommandOptionType.String,
        required: true  

    },
  ],
  run: async (Client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.BanMembers)) {
        interaction.reply(`Você não possui permissão para enviar um anuncio.`);
    } else {

        let canal = interaction.options.getChannel("canal")
        let titulo = interaction.options.getString("titulo")
        let desc = interaction.options.getString("desc")

        let e = new Discord.EmbedBuilder()
        .setColor('2f3136')
        .setTitle(titulo)
        // .setImage('') /// aqui meta o link da imagem ///
        .setFooter({text: `Anúncio enviado por: ${interaction.user.tag} | ${interaction.user.id}`})
        .setDescription(desc)
        .setTimestamp()
        .setFooter({ text: Client.user.username, iconURL: Client.user.displayAvatarURL({ dinamyc: true }) })

        canal.send({embeds: [e]})

        interaction.reply({content: `A mensagem foi enviada para ${canal} com sucesso!`, ephemeral: true})

    }
  }}

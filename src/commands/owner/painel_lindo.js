const { ApplicationCommandType, ApplicationCommandOptionType, ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder, Discord, PermissionFlagsBits } = require('discord.js')

module.exports = {
   name: 'taxado',
   description: 'Envie um texto com imagem e botões',
   type: ApplicationCommandType.ChatInput,
   options: [
     {
       name: 'texto',
       description: 'Insira o texto que estará em content',
       type: ApplicationCommandOptionType.String,
       required: true
     },
     {
       name: 'imagem',
       description: 'Insira o link da imagem que estará na mensagem',
       type: ApplicationCommandOptionType.String,
       required: true
     },
     {
       name: 'text1',
       description: 'Insira o texto que estará no botão um',
       type: ApplicationCommandOptionType.String,
       required: true
     },
     {
       name: 'text2',
       description: 'Insira o texto que estará no botão dois',
       type: ApplicationCommandOptionType.String,
       required: true
     },
     {
       name: 'link1',
       description: 'Insira o link que estará no botão um',
       type: ApplicationCommandOptionType.String,
       required: true
     },
     {
     name: 'link2',
       description: 'Insira o link que estará no botão dois',
       type: ApplicationCommandOptionType.String,
       required: true
     },
     {
       name: 'emoji1',
       description: 'Insira o emoji que estará no botão um',
       type: ApplicationCommandOptionType.String,
       required: true
     },
     {
       name: 'emoji2',
       description: 'Insira o emoji que estará no botão dois',
       type: ApplicationCommandOptionType.String,
       required: true
     }
   ],

  async run(client, interaction) {

    
    if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
        interaction.reply({ content: `Você não possui permissão para utilizar este comando.`, ephemeral: true })
    } else {
    
      const a = interaction.options.getString('texto')
    const images = interaction.options.getString('imagem')
    const text1 = interaction.options.getString('text1')
    const text2 = interaction.options.getString('text2')
    const link1 = interaction.options.getString('link1')
    const link2 = interaction.options.getString('link2')
      const emoji1 = interaction.options.getString('emoji1')
      const emoji2 = interaction.options.getString('emoji2')

    const aa = new ButtonBuilder()
        .setLabel(text1)
        .setStyle(ButtonStyle.Link)
        .setURL(link1)
        .setEmoji(emoji1);
    const aaa = new ButtonBuilder()
        .setLabel(text2)
        .setStyle(ButtonStyle.Link)
        .setURL(link2)
        .setEmoji(emoji2);
    
     const row = new ActionRowBuilder()
        .addComponents(aa, aaa)
    
    interaction.channel.send({ content: `${a}`, files:  [images], components: [row]  })
    
  }
} 
}
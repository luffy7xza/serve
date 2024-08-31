const { ApplicationCommandType, ApplicationCommandOptionType, ChannelType } = require("discord.js")

module.exports = {
    name: `nuke`,
    description: `Nuckar um canal`,
    type: ApplicationCommandType.ChatInput,

    run: async(client, interaction) => {

        const newChannel = await interaction.channel.clone()

        interaction.channel.delete()

        newChannel.send({
            content: `\`nucked by ${interaction.user.username}\``
        })

    }
}
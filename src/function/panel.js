const { ApplicationCommandType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, StringSelectMenuBuilder } = require("discord.js");
const { db , owner , tk } = require("../database/index");

async function panel(interaction) {
    const system = await db.get("system");
    await interaction.editReply({
        content:"",
        embeds: [
            new EmbedBuilder()
            .setAuthor({name: "Painel de Controle", iconURL: interaction.client.user.avatarURL()})
            .setDescription(`Oi Lkz Store Apps agradece, **${interaction.member.displayName}**! Aqui você pode controlar o bot como realmente quiser.`)
            .addFields(
                {
                    name:"Status:",
                    value:`${system ? "`Ligado`" : "`Desligado`"}`,
                    inline: true
                },
                {
                    name:"Lkz Store:",
                    value:`\`1.0.0\``,
                    inline: true
                },
                {
                    name:"Ping:",
                    value:`\`${interaction.client.ws.ping}ms\``,
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
                .setEmoji("<:eutambmtenho21:1261747649300922551>")
                .setStyle(3),
                new ButtonBuilder()
                .setCustomId("configpanel")
                .setLabel("Config ticket")
                .setStyle(1)
                .setEmoji("<:eutambmtenho23:1261747652949966950>"),
                new ButtonBuilder()
                .setCustomId("definition")
                .setLabel("Configurações")
                .setStyle(2)
                .setEmoji("<:eutambmtenho14:1261747635132436582>")
            )
        ],
        ephemeral: true
    });
}

async function roleStaff(interaction) {
    const role = interaction.guild.roles.cache.get(await db.get("definition.role")) || "`Não Definido.`";
    interaction.editReply({
        content:"",
        embeds: [
            new EmbedBuilder()
            .setAuthor({name:"Cargo", iconURL: interaction.client.user.avatarURL()})
            .setDescription(`- Configure o cargo que os staff usa.`)
            .addFields(
                {
                    name:"Cargo de Ticket:",
                    value:`${role}`
                }
            )
            .setColor("#00FFFF")
        ],
        components: [
            new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setCustomId("configrolekk")
                .setLabel("Configurar Cargos")
                .setStyle(2)
                .setEmoji("<:c_members:1261187006260707349>"),
                new ButtonBuilder()
                .setStyle(2)
                .setCustomId("definition")
                .setEmoji("<:eutambmtenho5:1261746102521167923>")
            )
        ]
    });
}

async function channelConfig(interaction) {
    const channels = await db.get("definition.channels");
    const logs = interaction.client.channels.cache.get(channels.logs) || "`Não Definido.`";
    const feedback = interaction.client.channels.cache.get(channels.feedback) || "`Não Definido.`";
    const category = interaction.client.channels.cache.get(channels.category) || "`Não Definido.`";

    await interaction.editReply({
       content:"",
       embeds: [
        new EmbedBuilder()
        .setAuthor({name:"Canais", iconURL: interaction.client.user.avatarURL()})
        .setDescription(`- Configure os canais que serão usados pelo bot.`)
        .setColor("#00FFFF")
        .addFields(
            {
                name:"Canal de Logs",
                value:`${logs}`,
                inline: true
            },
            {
                name:"Canal de FeedBack's",
                value:`${feedback}`,
                inline: true
            },
            {
                name:"Categoria de Ticket's",
                value:`${category}`,
                inline: true
            },
        )
       ],
       components: [
        new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId("configchannellogs")
            .setLabel("Configurar Logs")
            .setStyle(2)
            .setEmoji("<:c_ferrament:1261187033024696361>"),
            new ButtonBuilder()
            .setCustomId("configchannelfeedback")
            .setLabel("Configurar FeedBack")
            .setStyle(2)
            .setEmoji("<:c_star:1261186973331099668>"),
            new ButtonBuilder()
            .setCustomId("configchannelcategory")
            .setLabel("Configurar Categoria")
            .setStyle(2)
            .setEmoji("<:eutambmtenho24:1261746137770233967>"),
            new ButtonBuilder()
            .setStyle(2)
            .setCustomId("definition")
            .setEmoji("<:eutambmtenho5:1261746102521167923>")
        )
       ]
    });
}

async function functionTicket(interaction) {
    const functions = await db.get("definition.functionsTicket");
    const notify = functions.notifyuser ? "✅" : "❌";
    const assumir = functions.assumir ? "✅" : "❌";
    const call = functions.call ? "✅" : "❌";
    const renomear  = functions.renomear ? "✅" : "❌";
    const gerenciar = functions.gerenciar ? "✅" : "❌";
    const motivo = functions.motivo ? "✅" : "❌";

    await interaction.editReply({
        content:"",
        embeds: [
            new EmbedBuilder()
            .setAuthor({name:"Funções de Ticket", iconURL: interaction.client.user.avatarURL()})
            .setColor("#00FFFF")
            .setDescription(`- Configure as funções que estarão disponiveis dentro do ticket`)
            .addFields(
                {
                    name:`Notificar Usuário: \`(${notify})\``,
                    value:"- Notificar o usuário apenas apertando um botão."
                },
                {
                    name:`Assumir Ticket: \`(${assumir})\``,
                    value:"- Assumir o ticket apenas apertando um botão."
                },
                {
                    name:`Criar Call: \`(${call})\``,
                    value:"- Criar uma call apenas apertando um botão."
                },
                {
                    name:`Renomear Canal: \`(${renomear})\``,
                    value:"- Renomear o canal do Ticket apenas apertando um botão."
                },
                {
                    name:`Gerenciar Membros: \`(${gerenciar})\``,
                    value:"- Gerenciar membros do ticket apenas apertando um botão"
                },
                {
                    name:`Motivo Ticket: \`(${motivo})\``,
                    value:"- Ao o usuário tentar abrir ticket, deverá informar o motivo."
                },
            )
        ],
        components: [
            new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                .setCustomId("functionSelectcConfig")
                .setMaxValues(1)
                .setMinValues(1)
                .setPlaceholder("Ative/Desative uma opção por aqui.")
                .addOptions(
                    {
                        label:"Voltar ao Painel Principal",
                        description:"Voltar ao Painel Principal",
                        value:"voltarpanel",
                        emoji:"<:eutambmtenho2:1261746097383149640>"
                    },
                    {
                        label:"Notificar Usuário",
                        description:"Ativar/Desativar",
                        value:"notifyuser",
                        emoji:"<:eutambmtenho2:1261746097383149640>"
                    },
                    {
                        label:"Assumir Ticket",
                        description:"Ativar/Desativar",
                        value:"assumir",
                        emoji:"<:eutambmtenho2:1261746097383149640>"
                    },
                    {
                        label:"Criar Call",
                        description:"Ativar/Desativar",
                        value:"call",
                        emoji:"<:eutambmtenho2:1261746097383149640>"
                    },
                    {
                        label:"Renomear Canal",
                        description:"Ativar/Desativar",
                        value:"renomear",
                        emoji:"<:eutambmtenho2:1261746097383149640>"
                    },
                    {
                        label:"Gerenciar Membros",
                        description:"Ativar/Desativar",
                        value:"gerenciar",
                        emoji:"<:eutambmtenho2:1261746097383149640>"
                    },
                    {
                        label:"Motivo Ticket",
                        description:"Ativar/Desativar",
                        value:"motivo",
                        emoji:"<:eutambmtenho2:1261746097383149640>"
                    },
                )
            )
        ]
    });
}

async function panelConfig(interaction) {
    const panel = await db.get("panel");
    const embed = new EmbedBuilder()
    .setAuthor({ name:"Painel de Tickets", iconURL: interaction.client.user.avatarURL()})
    .setColor("#00FFFF")
    .setDescription(`- Acima você pode ver a aparência atual do ticket. Abaixo você pode configurar o ticket.`)
    .addFields(
        {
            name:"Aviso:",
            value:"Ao clicar no botão abaixo, você poderá escolher se deseja que a mensagem seja enviada com ou sem embed"
        }
    );

    const all = Object.entries(panel.functions);
    const components = [
        new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId("trocarembedcontent")
            .setLabel(`Trocar para ${panel.mensagem.content ? "Embed" : "Mensagem"}`)
            .setStyle(2),
            new ButtonBuilder()
            .setCustomId("definitraparenciafunction")
            .setLabel("Definir Aparência")
            .setStyle(2)
            .setEmoji("<:c_members:1261187006260707349>"),
            new ButtonBuilder()
            .setCustomId("resetartudofunction")
            .setLabel("Resetar Tudo")
            .setStyle(4)
            .setEmoji("<:c_reset:1261187026250764308>")
        ),
        new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId("addfunction")
            .setLabel("Adicionar Função")
            .setStyle(2)
            .setDisabled(all.length > 4)
            .setEmoji("<:eutambmtenho19:1261746127758299188>"),
            new ButtonBuilder()
            .setCustomId("editfunction")
            .setLabel("Editar Função")
            .setStyle(2)
            .setEmoji("<:eutambmtenho20:1261747647291588609>")
            .setDisabled(all.length < 1),
            new ButtonBuilder()
            .setCustomId("removefunction")
            .setLabel("Remover Função")
            .setStyle(2)
            .setEmoji("<:eutambmtenho18:1261747643395211284>")
            .setDisabled(all.length < 1),
        ),
        new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId("postmsg")
            .setLabel("Postar Mensagem")
            .setStyle(1)
            .setDisabled(all.length < 1)
            .setEmoji("<:eutambmtenho24:1261746137770233967>"),
            new ButtonBuilder()
            .setCustomId("testmsg")
            .setLabel("Testar Mensagem")
            .setStyle(2)
            .setDisabled(all.length < 1)
            .setEmoji("<:c_ferrament:1261187033024696361>"),
            new ButtonBuilder()
            .setCustomId("sincronizar")
            .setLabel("Sincronizar")
            .setDisabled(true)
            .setStyle(2)
            .setEmoji("<:c_reset:1261187026250764308>"),
        ),
        new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId("alterarbotaoselect")
            .setLabel("Alterar Botão/Select")
            .setStyle(2)
            .setDisabled(all.length < 1)
            .setEmoji("<:eutambmtenho7:1261747622264311838>"),
            new ButtonBuilder()
            .setStyle(2)
            .setCustomId("voltar")
            .setEmoji("<:eutambmtenho5:1261746102521167923>")
        )
    ];
    const row = new ActionRowBuilder();
    all.forEach((rs) => {
        const id = rs["0"];
        const data = rs["1"];
        embed.addFields(
            {
                name:`Função: \`${id}\``,
                value:`Pré-Descrição: \`${data.predesc}\`\nDescrição: ${!data.desc ? "`Não Definido`" : data.desc}\nBanner: ${!data.banner?.startsWith("https://") ? "`Não Definido`" : `[Link da Imagem](${data.banner})`}\nEmoji: \`${!data.emoji ? "`Não Definido`" : data.emoji}\``
            }
        );
        if(panel.button) {
            const button = new ButtonBuilder()
            .setCustomId(id)
            .setLabel(`${id} (Simulado)`)
            .setStyle(2)
            .setDisabled(true);

            if(data.emoji) button.setEmoji(data.emoji);
            
            row.addComponents(button);
        };
    });
    if(all.length > 0) {
        if(!panel.button) {
            components.push(
                new ActionRowBuilder()
                .addComponents(
                    new StringSelectMenuBuilder()
                    .setCustomId("asodnaisu")
                    .setPlaceholder("Selecione uma função")
                    .setMaxValues(1)
                    .setDisabled(true)
                    .setMinValues(1)
                    .addOptions(
                        {
                            label:"asidnas",
                            value:"soadmioas"
                        }
                    )
                )
            );
        } else {
            components.push(row);
        }
    }

    let is;
    if(panel.mensagem.content) {
        is = {
            content:`${panel.mensagem.msg.content}`,
            embeds: [embed],
            components
        }
    } else {
        const m = panel.mensagem.embeds;
        const embed1 = new EmbedBuilder()
        .setTitle(m.title)
        .setDescription(m.desc)
        .setImage(m.banner)
        .setColor(m.cor);

        is = {
            content:``,
            embeds: [embed1, embed],
            components
        }
    }

    await interaction.editReply(is);

}

module.exports = {
    panel,
    roleStaff,
    channelConfig,
    functionTicket,
    panelConfig
};
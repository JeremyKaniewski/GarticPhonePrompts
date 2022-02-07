import { ButtonInteraction, CollectorFilter, MessageActionRow, MessageButton, MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import WordsService from "../services/words";

export default {
    category: "Prompts",
    description: "Generates a random prompt based on the word bank",
    slash: true,

    callback: ({interaction: msgInt, channel}) => {
        const embed = new MessageEmbed()
        const row = new MessageActionRow()

        try {
            let prompt = WordsService.generatePrompt()

            embed  
                .setTitle("Prompt Generator")
                .setDescription(prompt)
                .setColor("GREEN")

            row
                .addComponents(
                    new MessageButton()
                        .setCustomId("new-prompt")
                        .setLabel("Generate another")
                        .setEmoji("♻️")
                        .setStyle("PRIMARY")
                )

            const filter: CollectorFilter<any[]> = (btnInt: ButtonInteraction) => {
                return msgInt.user.id === btnInt.user.id
            }

            const collector = channel.createMessageComponentCollector({filter})

            collector.on("collect", (i: ButtonInteraction) => {
                try {
                    let prompt = WordsService.generatePrompt();

                    embed
                        .setDescription(prompt)
                        .setColor("GREEN")
                } catch (error) {
                    embed
                        .setTitle("Error!")
                        .setDescription("An error occured")
                        .setColor("RED")
                        console.log(error)
                }

                i.deferUpdate()
                msgInt.editReply({embeds: [embed]})
            })
        } catch (error) {
            embed
                .setTitle("Error!")
                .setDescription("An error occured!")
                .setColor("RED")

            console.log(error)
        }

        msgInt.reply({embeds: [embed], components: [row], ephemeral: true})
    }
} as ICommand
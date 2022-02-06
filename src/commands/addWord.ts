import DiscordJS, { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";
import WordsService from "../services/words";

export default {
    category: "Add Word",
    description: "Adds a word to the word bank",
    slash: true,
    testOnly: true,

    options: [{
        name: "category",
        description: "category of word you're adding",
        required: true,
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING,
        choices: [{
            name: "Name",
            value: "names"
        }, {
            name: "Verb",
            value: "verbs"
        }, {
            name: "Locations",
            value: "locations"
        }]
    }, {
        name: "words",
        required: true,
        description: "Add the word(s) - If adding multiple seperate with commas",
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING,
    }],

    callback: async ({interaction, args, channel}) => {
        const [category, words] = args

        const embed = new MessageEmbed()
            .setTitle("Processing..")
            .setColor("YELLOW")
            .setDescription("We're processing your words now - hang on")

        await interaction.reply({embeds: [embed], ephemeral: true})
        
        const finalEmbed = new MessageEmbed()

        try {
            let formattedWords = WordsService.formatInput(words)
            let duplicates = WordsService.addWords(formattedWords, category)
            let description = ""

            for (let i = 0; i < formattedWords.length; i++) {
                description += `${formattedWords[i].toUpperCase()}: ${duplicates[i] ? "Duplicate" : "Success"}\n`
            }

            if (duplicates.indexOf(true) === -1) {
                finalEmbed
                    .setTitle("Success!")
                    .setColor("GREEN")
                    .setDescription(description)
            } else {
                finalEmbed
                    .setTitle("Success - with duplicates")
                    .setColor("ORANGE")
                    .setDescription(description)
            }

            await interaction.editReply({embeds: [finalEmbed]})
        } catch (error) {
            console.log(error)
            
            finalEmbed
                .setTitle("Error!")
                .setColor("RED")
                .setDescription("An error occured! Please contact Hellostop#1173")

            await interaction.editReply({embeds: [finalEmbed]})
        }
    }
} as ICommand
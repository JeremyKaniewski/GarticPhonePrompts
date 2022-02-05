import DiscordJS, { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: "Add Word",
    description: "Adds a word to the word bank",
    slash: true,
    testOnly: true,

    options: [{
        name: "type",
        description: "Type of word you're adding",
        required: true,
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING,
        choices: [{
            name: "Name",
            value: "name"
        }, {
            name: "Verb",
            value: "verb"
        }]
    }, {
        name: "Words",
        required: true,
        description: "Add the word(s) - If adding multiple seperate with commas",
        type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING,
    }],

    callback: async ({interaction, args}) => {
        const [type, words] = args
        console.log(type)
        console.log(words)

        const embed = new MessageEmbed()
            .setTitle("test")

        await interaction.reply({embeds: [embed], ephemeral: true})
    }
} as ICommand
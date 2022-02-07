import { MessageEmbed } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: "Help",
    description: "Bot Information",

    callback: ({interaction}) => {
        const embed = new MessageEmbed()
            .setTitle("Gartic Phone Prompt Generator")
            .addField("Information", "This bot generates prompts for the online game Gartic Phone"
            + "based on a user generated word bank")

            .addField("\n How it works", "First users provide at least 3 words in each category"
            + "(Names, Verbs, Locations), and then the bot will randomly generate prompts!")

            .addField("Commands", 
            +"``Help`` - You're here\n"
            +"``addWord`` - Adds word(s). If adding multiple words, seperate with comma\n"
            +"``prompt`` - Generates a random prompt")

        interaction.reply({embeds: [embed], ephemeral: true})
    }
} as ICommand
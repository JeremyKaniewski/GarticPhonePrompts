import DiscordJS, { Intents } from "discord.js";
import WOKCommands from 'wokcommands';
import path from 'path';
import { ENV } from "./config";

const client = new DiscordJS.Client({
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES
    ],
  });

client.on("ready", async () => {
    console.log(">> Bot started");

    new WOKCommands(client, {
        commandDir: path.join(__dirname, 'commands'),
        typeScript: process.env.NODE_ENV === "production" ? false : true, // FOR PRODUCTION THIS NEEDS TO BE FALSE OR IT WONT REGISTER COMMANDS
        testServers: '899334233552732180',
    })

    if (process.env.NODE_ENV === "production") {
      client.user!.setActivity("OPERATIONAL")
      client.user!.setStatus("online")
    } else {
      client.user!.setActivity("TEST MODE")
      client.user!.setStatus("dnd")
    }
})

client.login(ENV.BOT_TOKEN ?? "");
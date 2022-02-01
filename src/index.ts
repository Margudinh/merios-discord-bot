import { Client, Intents } from "discord.js";
import config from "./config";
import getopts from "getopts";
import executeCommand from "./commands/ExecuteCommand";

const client = new Client({
  intents: [
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.GUILDS,
  ],
});

client.on("messageCreate", async (message) => {
  if (message.content.startsWith("$$ ")) {
    const cmd = message.content.replace("$$ ", "");
    const commandOpts = getopts(cmd.split(" "));
    console.log(commandOpts);
    const [ command, arg ] = commandOpts._;

    await executeCommand(command, arg, commandOpts, message);
  }
});

client.on("ready", () => {
  console.log("🤖 Bot is ready");
});

client.login(config.discordToken);

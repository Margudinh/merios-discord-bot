import { Message } from "discord.js"
import { ParsedOptions } from "getopts"
import GreetCommand from "./Greet"
import IExecutable from "./IExecutable"
import RedditCommand from "./Reddit";

const commands: Map<string, IExecutable> = new Map(Object.entries({
  "greet": new GreetCommand(),
  "reddit": new RedditCommand()
}))

const executeCommand = async (commandName: string, arg: string, options: ParsedOptions, message: Message<boolean>) => {

  if(!commands.has(commandName)){
    message.reply({
      content: `**Error: ** the command ${commandName} does not exists`
    })

    return;
  }

  const command = commands.get(commandName);
  await command?.execute(arg, options, message);
}

export default executeCommand;
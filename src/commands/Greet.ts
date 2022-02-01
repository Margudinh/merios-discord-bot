import { Message } from "discord.js";
import { ParsedOptions } from "getopts";
import IExecutable from "./IExecutable";



export default class GreetCommand implements IExecutable {

  async execute(arg: string, options: ParsedOptions, message: Message<boolean>): Promise<void>{
    await message.reply({
      content: `Hi ${arg}`
    })
  }
};
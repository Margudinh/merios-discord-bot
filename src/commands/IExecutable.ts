import { Message } from "discord.js";
import { ParsedOptions } from "getopts";


export default interface IExecutable {

  execute(arg: string, options: ParsedOptions, message: Message<boolean>) : void | Promise<void>;

}
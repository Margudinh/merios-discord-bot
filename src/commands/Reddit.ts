import { Message } from "discord.js";
import { ParsedOptions } from "getopts";
import { random, shuffle } from "lodash";
import RedditHttpClient from "../services/RedditHttpClient";
import IExecutable from "./IExecutable";



export default class RedditCommand implements IExecutable {
  client: RedditHttpClient 

  constructor(){
    this.client = new RedditHttpClient();
  }

  async execute(arg: string, options: ParsedOptions, message: Message<boolean>): Promise<void> {
    const [singleBatch] = await this.client.getRandomPostFromSubreddit(arg);
    const posts = singleBatch.data.children;
    const [ post ] = posts;
    message.reply({
      content: `${post.data.title} \n ${post.data.url_overridden_by_dest}`
    });
  
  }
}
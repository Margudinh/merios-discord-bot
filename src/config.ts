import dotenv from "dotenv";
dotenv.config();

const config = {
  discordToken: process.env.DISCORD_TOKEN,
  redditClientId: process.env.REDDIT_CLIENT_ID,
  redditClientSecret: process.env.REDDIT_CLIENT_SECRET
};

export default config;
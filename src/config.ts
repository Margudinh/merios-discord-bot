import dotenv from "dotenv";
dotenv.config();

const config = {
  discordToken: process.env.DISCORD_TOKEN
};

export default config;
import "core-js/stable";
import "regenerator-runtime/runtime";
import { Client } from "discord.js";
import { config } from "dotenv";

import commands from "./commands";

// dotenv
config();

const bot = new Client();
const { DANKBOT_TOKEN } = process.env;

bot.on("ready", () => {
  bot.user.setActivity("HARDCORE BUTT STUFF", {
    type: "STREAMING",
    url: "https://twitch.tv/HARDCORE_BUTT_STUFF",
  });

  // eslint-disable-next-line no-console
  console.log(`Logged in as ${bot.user.tag}!`);
});

commands(bot);

bot.login(DANKBOT_TOKEN);

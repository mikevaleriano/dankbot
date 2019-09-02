// these 2 imports are needed for babel
// they replace @babel/polyfill as of babel 7.4.0
import "core-js/stable";
import "regenerator-runtime/runtime";

import { Client } from "discord.js";

import commands from "./commands";

const bot = new Client();
const { STARTER_BOT_TOKEN } = process.env;

bot.on("ready", () => {
  bot.user.setActivity("HARDCORE BUTT STUFF", {
    type: "STREAMING",
    url: "https://twitch.tv/HARDCORE_BUTT_STUFF"
  });

  console.log(`Logged in as ${bot.user.tag}!`);
});

commands(bot);

bot.login(STARTER_BOT_TOKEN);

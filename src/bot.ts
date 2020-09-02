import { Client } from "discord.js";

import commands from "./commands/commands";

const bot = new Client();
const { DANKBOT_TOKEN } = process.env;

bot.on("ready", () => {
  if (!bot.user) {
    throw new Error("Shit happened yo");
  }

  bot.user.setActivity("SIMPING FOR ASMONGOLD", {
    type: "STREAMING",
    url: "https://twitch.tv/asmongold",
  });

  // eslint-disable-next-line no-console
  console.log(`Logged in as ${bot.user.tag}!`);
});

commands(bot);

bot.login(DANKBOT_TOKEN);

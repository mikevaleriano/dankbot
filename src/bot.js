import { Client } from "discord.js";

import commands from "./commands/commands.js";

const bot = new Client();
const { DANKBOT_TOKEN } = process.env;

bot.on("ready", () => {
  bot.user.setActivity("E-LOVING MY E-GIRL", {
    type: "STREAMING",
    url: "https://twitch.tv/HARDCORE_BUTT_STUFF",
  });

  // eslint-disable-next-line no-console
  console.log(`Logged in as ${bot.user.tag}!`);
});

commands(bot);

bot.login(DANKBOT_TOKEN);

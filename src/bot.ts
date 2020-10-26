/* eslint-disable no-console */

import { Client } from "discord.js";

const bot = new Client();
const { DANKBOT_TOKEN } = process.env;
const PREFIX = "!";

bot.on("ready", () => {
  if (!bot.user) {
    throw new Error("Shit happened yo");
  }

  bot.user.setActivity("SIMPING FOR ASMONGOLD", {
    type: "STREAMING",
    url: "https://twitch.tv/asmongold",
  });

  console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on("message", async (msg) => {
  const breakDown = msg.content.split(" ");

  if (breakDown[0].substring(0, PREFIX.length) !== PREFIX) {
    return;
  }

  const command = breakDown[0].substring(PREFIX.length);
  const args = breakDown.slice(1);

  const fileName = `./commands/${command}`;
  try {
    const temp = await import(fileName);
    if (temp) {
      temp.default(msg, args, bot);
    }
  } catch (e) {
    console.log(e.message);
  }
});

bot.login(DANKBOT_TOKEN);

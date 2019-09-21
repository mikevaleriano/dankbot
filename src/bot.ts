import "core-js/stable";
import "regenerator-runtime/runtime";
import mongoose from "mongoose";

import { Client } from "discord.js";

import commands from "./commands";

const bot = new Client();
const { STARTER_BOT_TOKEN } = process.env;

const conn = mongoose.connection;

conn.on("error", err => {
  throw err.message;
});

mongoose.connect(process.env.YCURI as string, {
  useNewUrlParser: true,
  dbName: process.env.YCDB as string,
  useFindAndModify: false,
  useUnifiedTopology: true
});

bot.on("ready", () => {
  bot.user.setActivity("HARDCORE BUTT STUFF", {
    type: "STREAMING",
    url: "https://twitch.tv/HARDCORE_BUTT_STUFF"
  });

  console.log(`Logged in as ${bot.user.tag}!`);
});

commands(bot);

bot.login(STARTER_BOT_TOKEN);

// eslint-disable-next-line no-unused-vars
import { Client } from "discord.js";

import sub from "./sub";
import mov from "./mov";

/**
 *
 * @param {Client} bot
 */
export default function(bot) {
  bot.on("message", async msg => {
    const args = msg.content.split(" ");
    let result;

    switch (args[0]) {
      case "!sub":
        result = await sub(args);
        await msg.channel.send(result.embed);
        if (result.extra) {
          msg.channel.send(result.extra);
        }
        break;

      case "!mov":
        result = await mov(args);
        msg.channel.send(result);
        break;

      default:
    }
  });
}

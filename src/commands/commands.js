import { Client } from "discord.js";
import sub from "./sub/sub.js";

/**
 *
 * @param {Client} bot - Discord.js Client
 */
export default function commands(bot) {
  bot.on("message", async (msg) => {
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

      default:
    }
  });
}

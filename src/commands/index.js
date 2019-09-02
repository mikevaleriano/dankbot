import { Client } from "discord.js";

import subreddit from "./_sub";

/**
 *
 * @param {Client} bot
 */
export default function(bot) {
  bot.on("message", async msg => {
    const args = msg.content.split(" ");
    switch (args[0]) {
      case "!sub":
        if (args[1]) {
          const result = await subreddit(args[1]);

          await msg.channel.send(result.embed);
          if (result.extra) {
            msg.channel.send(result.extra);
          }
        }
        break;

      default:
    }
  });
}

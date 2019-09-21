import { Client } from "discord.js";

import sub from "./sub";
import ca from "./ca";

export default function(bot: Client): void {
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

      case "!ca":
        result = await ca(args, msg);
        const ch = msg.client.channels.find(ch => ch.name === "bloodymemo");
        await ch.send(result.embed);
        if (result.target) {
          const { guild } = msg;
          const dude = guild.members.find("displayName", result.target);
          dude.addRole("624847208008908801", "Cartão vermelho, bicho");
        }
        break;

      default:
    }
  });
}

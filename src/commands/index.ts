import { Client, VoiceChannel } from "discord.js";

import sub from "./sub";
import punish from "./punish";

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
      case "!punish":
        if (msg.mentions.members.first()) {
          const target = msg.mentions.members.first();
          const oldChannel = target.voiceChannel;
          const channel = msg.guild.channels.find(
            x => x.name === "timeout" || x.name === "Canal do Opo-Opo"
          ) as VoiceChannel;
          await punish(target, channel, oldChannel, bot, msg);
        }
        break;

      default:
    }
  });
}

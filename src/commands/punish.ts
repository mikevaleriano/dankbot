import { GuildMember, VoiceChannel, GuildChannel, Client } from "discord.js";
import ytdl from "ytdl-core";

export default async function(
  target: GuildMember,
  channel: VoiceChannel,
  oldChannel: VoiceChannel,
  bot: Client
): Promise<void> {
  if (bot.voiceConnections.first()) {
    return;
  }

  const conn = await channel.join();

  await target.setVoiceChannel(channel as GuildChannel);

  const stream = ytdl("https://www.youtube.com/watch?v=HqMR__TTiAQ");
  const dispatcher = conn.playStream(stream, { seek: 2 });

  dispatcher.on("start", () => {
    bot.on("voiceStateUpdate", async (oldUser, newUser) => {
      if (newUser === target) {
        await target.setVoiceChannel(channel as GuildChannel);
      }
    });
  });
  dispatcher.on("end", async () => {
    bot.removeAllListeners("voiceStateUpdate");
    await target.setVoiceChannel(oldChannel);
    channel.leave();
  });
}

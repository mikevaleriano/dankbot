import { GuildMember, VoiceChannel, GuildChannel, Client } from "discord.js";
import ytdl from "ytdl-core";

const resist = ["AsGadjc", "OifqANC", "8clg9g7"];

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

  target.send("You're being punished. Resisting is futile.");

  const stream = ytdl("https://www.youtube.com/watch?v=HqMR__TTiAQ");
  const dispatcher = conn.playStream(stream, { seek: 2 });

  dispatcher.on("start", () => {
    bot.on("voiceStateUpdate", async (oldUser, newUser) => {
      if (newUser === target) {
        await target.setVoiceChannel(channel as GuildChannel);
      }
    });
    bot.once("voiceStateUpdate", async (oldUser, newUser) => {
      if (newUser === target) {
        await target.send(
          "You are being punished. Just let it happen. It will all be over soon.",
          {
            embed: {
              image: {
                url: `https://i.imgur.com/${
                  resist[Math.floor(Math.random() * resist.length)]
                }.jpg`
              }
            }
          }
        );
      }
    });
  });
  dispatcher.on("end", async () => {
    bot.removeAllListeners("voiceStateUpdate");
    await target.setVoiceChannel(oldChannel);
    channel.leave();
  });
}

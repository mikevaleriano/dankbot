import ytdl from "ytdl-core";

const resist = ["AsGadjc", "OifqANC", "8clg9g7"];

export default async function (target, channel, oldChannel, bot, msg) {
  if (bot.voiceConnections.first()) {
    return;
  }

  const conn = await channel.join();
  const stream = ytdl("https://www.youtube.com/watch?v=HqMR__TTiAQ");
  const dispatcher = conn.playStream(stream, { seek: 2 });

  dispatcher.on("start", () => {
    bot.on("voiceStateUpdate", async (oldUser, newUser) => {
      if (newUser === target) {
        await target.setVoiceChannel(channel);
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
                }.jpg`,
              },
            },
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

  await msg.channel.send(
    `<@${target.id}> is being punished by <@${msg.author.id}>`
  );

  await target.setVoiceChannel(channel);

  target.send("You're being punished. Resisting is futile.");
}

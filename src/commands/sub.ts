/* eslint-disable no-console, no-await-in-loop */

import axios from "axios";
import { Client, Message, MessageEmbed } from "discord.js";

import subList from "./sub_list.json";

export default async function Sub(
  msg: Message,
  args: string[],
  bot: Client
): Promise<void> {
  const arg = args[0] || null;

  async function showStuff(em: MessageEmbed, ex: MessageEmbed | null = null) {
    await msg.channel.send(em);
    if (ex) {
      await msg.channel.send(ex);
    }
  }

  const embed = new MessageEmbed();
  let extra: MessageEmbed | null = null;
  embed.setColor("#FF00FF");

  if (arg === "?") {
    embed.setTitle(
      "The *!sub* command (followed by the appropriate argument) will return a random post from the following subs:"
    );
    embed.addField("```!sub *```", "** *Random sub!* **", true);
    subList.forEach((i) => {
      embed.addField(
        `\`\`\`!sub ${i.nick}\`\`\``,
        `[r/${i.full}](https://reddit.com/r/${i.full})`,
        true
      );
    });
    showStuff(embed, extra);
    return;
  }

  if (!arg) {
    embed.addField(
      "No sub argument",
      "You gotta ask for the sub you want, dawg. Like: ```!sub dm```\n\nFor help, check: ```!sub ?```"
    );
    showStuff(embed, extra);
    return;
  }

  const subIsListed = subList.find((i) => i.nick === arg);
  if (!subIsListed && arg !== "*") {
    embed.addField(
      "Invalid entry, yo.",
      "Check valid entries with:```!sub ?```"
    );
    showStuff(embed, extra);
    return;
  }

  const realSub =
    arg !== "*"
      ? subList[subList.findIndex((i) => i.nick === arg)].full
      : subList[Math.floor(Math.random() * subList.length)].full;

  const postUrl = `https://reddit.com/r/${realSub}/random.json`;
  const subUrl = `https://reddit.com/r/${realSub}/about.json`;

  let subData;
  let postData;
  let badUrl = true;
  do {
    try {
      const [post, sub] = await Promise.all([
        axios.post(postUrl),
        axios.post(subUrl),
      ]);

      subData = sub;
      postData = post;

      // prevent v.redd.it bullshit
      const tester = Array.isArray(postData.data)
        ? postData.data[0].data.children[0].data
        : postData.data.data.children[0].data;
      badUrl = tester.url.startsWith("https://v.redd.it");
      if (badUrl) {
        console.log(`BAD_URL in ${arg}: iterating`);
      }
    } catch (e) {
      console.log(e.message);
    }
  } while (badUrl);

  if (subData && postData) {
    const sub = subData.data.data;
    const post = Array.isArray(postData.data)
      ? postData.data[0].data.children[0].data
      : postData.data.data.children[0].data;

    embed
      .setAuthor(
        sub.title,
        sub.icon_img || "https://i.imgur.com/PNhOE9K.png",
        `https://reddit.com/${sub.display_name_prefixed}`
      )
      .setThumbnail(sub.community_icon || "https://i.imgur.com/PNhOE9K.png")
      .setTitle(post.title)
      .setURL(`https://reddit.com${post.permalink}`);

    if (
      post.url.endsWith(".gifv") ||
      post.url.startsWith("https://gfycat") ||
      post.url.startsWith("https://www.gfycat") ||
      post.url.startsWith("https://youtu") ||
      post.url.startsWith("https://www.youtu") ||
      post.selftext
    ) {
      extra = post.url || post.selftext;
    } else {
      embed.setImage(post.url);
    }

    embed.setFooter(
      `Shamelessly stolen from ${sub.display_name_prefixed}`,
      "https://i.gifer.com/hc7.gif"
    );
  } else {
    embed.addField(
      "No idea",
      "An obscure AF error has occurred but I'm not about to investigate this atm."
    );
  }

  showStuff(embed, extra);
}

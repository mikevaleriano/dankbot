import axios from "axios";
import { RichEmbed } from "discord.js";

import subList from "./list.json";

export default async function(args) {
  const embed = new RichEmbed();
  embed.setColor("#FF00FF");

  if (args[1] === "?") {
    embed.setTitle(
      "The *!sub* command (followed by the appropriate argument) will return a random post from the following subs:"
    );
    embed.addField("```!sub *```", "** *Random sub!* **", true);
    Object.keys(subList).forEach(i => {
      embed.addField(
        `\`\`\`!sub ${i}\`\`\``,
        `[r/${subList[i]}](https://reddit.com/r/${subList[i]})`,
        true
      );
    });
    return { embed };
  }

  if (!args[1]) {
    embed.addField(
      "No sub argument",
      "You gotta ask for the sub you want, dawg. Like: ```!sub dm```\n\nFor help, check: ```!sub ?```"
    );
    return { embed };
  }

  if (!subList[args[1]] && args[1] !== "*") {
    embed.addField(
      "Invalid entry, yo.",
      "Check valid entries with:```!sub ?```"
    );
    return { embed };
  }

  if (args[1] === "*") {
    const subs = Object.keys(subList);
    args[1] = subs[Math.floor(Math.random() * subs.length)];
  }

  const postUrl = `https://reddit.com/r/${subList[args[1]]}/random.json`;
  const subUrl = `https://reddit.com/r/${subList[args[1]]}/about.json`;

  let subData;
  let postData;
  let badUrl = true;
  do {
    try {
      const [post, sub] = await Promise.all([
        axios.post(postUrl),
        axios.post(subUrl)
      ]);

      subData = sub;
      postData = post;

      // prevent v.redd.it bullshit
      const tester = Array.isArray(postData.data)
        ? postData.data[0].data.children[0].data
        : postData.data.data.children[0].data;
      badUrl = tester.url.startsWith("https://v.redd.it");
      if (badUrl) {
        console.log(`BAD_URL in ${args[1]}: iterating`);
      }
    } catch (e) {
      console.log(e.message);
    }
  } while (badUrl);

  const sub = subData.data.data;
  const post = Array.isArray(postData.data)
    ? postData.data[0].data.children[0].data
    : postData.data.data.children[0].data;

  embed
    .setAuthor(
      sub.title,
      sub.icon_img || "https://i.imgur.com/PNhOE9K.png",
      `https://reddit.com${sub.display_name_prefixed}`
    )
    .setThumbnail(sub.community_icon || "https://i.imgur.com/PNhOE9K.png")
    .setTitle(post.title)
    .setURL(`https://reddit.com${post.permalink}`);

  let extra = null;
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
    `Shamelessly stolen from ${sub.display_name_prefixed}, on reddit.`,
    "https://i.gifer.com/hc7.gif"
  );

  return { embed, extra };
}

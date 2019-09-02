import axios from "axios";
import { RichEmbed } from "discord.js";

import subList from "./_subList.json";

export default async function(arg) {
  const postUrl = `https://reddit.com/r/${subList[arg]}/random.json`;
  const subUrl = `https://reddit.com/r/${subList[arg]}/about.json`;

  let subData;
  let postData;
  const embed = new RichEmbed();
  try {
    const [post, sub] = await Promise.all([
      axios.post(postUrl),
      axios.post(subUrl)
    ]);

    subData = sub;
    postData = post;
  } catch (e) {
    console.log(e.message);
  }
  const sub = subData.data.data;
  const post = Array.isArray(postData.data)
    ? postData.data[0].data.children[0].data
    : postData.data.data.children[0].data;

  // resolve user icon
  const userIcon =
    sub.icon_img || sub.community_icon || "https://i.imgur.com/PNhOE9K.png";

  embed
    .setColor("#FF00FF")
    .setAuthor(
      sub.title,
      userIcon,
      `https://reddit.com${sub.display_name_prefixed}`
    )
    .setTitle(post.title)
    .setURL(`https://reddit.com${post.permalink}`);

  const extra = post.media ? post.url : post.selftext || null;

  if (!post.media && !post.selftext) {
    embed.setImage(post.url);
  }

  return { embed, extra };
}

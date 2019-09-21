import { config } from "dotenv";
import { RichEmbed, Message } from "discord.js";
import { Document } from "mongoose";
import { CaModel } from "./model";

config();

interface Nigga extends Document {
  name: string;
  yellow: number;
  red: number;
}

const redThumb =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Red_card.svg/788px-Red_card.svg.png";

const yellowThumb =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Yellow_card.svg/788px-Yellow_card.svg.png";

const yellowCards = [
  "https://media.tenor.com/images/b5294dfa9ad8e604d82000edd7342b2a/tenor.gif",
  "https://media.tenor.com/images/89c64274fc8a5e1116f753ce84cc6d45/tenor.gif",
  "https://media2.giphy.com/media/5htJRajGqoO35hSAlw/giphy.gif",
  "https://i.makeagif.com/media/7-06-2015/S8uiEk.gif",
  "https://media2.giphy.com/media/noLZKFE9rNmWk/giphy.gif",
  "https://media2.giphy.com/media/4QEReFIDu5y13QywTT/giphy.gif"
];

const redCards = [
  "https://media1.giphy.com/media/X8crb29PtSsLidsPet/giphy.gif",
  "https://media1.tenor.com/images/5f187b26ce1026d0525af5d29c9c7da0/tenor.gif?itemid=3545583",
  "https://media0.giphy.com/media/gGwcGLgNJFoEbQHXeQ/giphy.gif",
  "https://media2.giphy.com/media/3o7qE0gOGwzPbH81Qk/giphy.gif"
];

interface Stuff {
  embed: RichEmbed;
  target: string;
}

export default async function(args: string[], msg: Message): Promise<Stuff> {
  const embed = new RichEmbed();
  embed.setColor("#FF00FF");
  embed.setTitle("!ca");

  if (args[1] === "?") {
    embed.addField(
      "?",
      "O commando *!ca* seguido do nome do seu amiguinho o presenteia com um cartão amarelo."
    );
    return { embed, target: "" };
  }

  if (!args[1]) {
    embed.addField(
      "Nenhum nome detectado",
      "Você precisa especificar o nome de quem vai receber o cartão amarelo, poha. EX: ```!ca JeováLover584```"
    );
    return { embed, target: "" };
  }

  args.shift();
  const target = args.join(" ");
  const members = msg.guild.members.map(item => item.displayName);
  if (!members.includes(target)) {
    embed.addField(
      "Usuário não encontrado no server",
      `Mas quem diabos é *${target}*? QUEM?`
    );
    return { embed, target: "" };
  }

  embed.addField(`${target} foi advertido!`, `A regra é clara.`);

  let dude = (await CaModel.findOne({ name: target })) as Nigga;
  if (!dude) {
    const newDude = new CaModel({ name: target }) as Nigga;
    await newDude.save();
    dude = newDude;
  } else {
    if (dude.yellow === 0) {
      dude.yellow += 1;
    } else {
      dude.yellow = 0;
      dude.red += 1;
    }
    await dude.save();
  }

  const thumb = dude.yellow === 1 ? yellowThumb : redThumb;
  const cards = dude.yellow === 1 ? yellowCards : redCards;

  embed.setThumbnail(thumb);
  embed.setImage(cards[Math.floor(Math.random() * cards.length)]);

  return { embed, target: dude.yellow ? "" : target };
}

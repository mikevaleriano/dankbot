import { RichEmbed } from "discord.js";

import find from "./find";
import next from "./next";

const IMDB_LOGO =
  "https://ia.media-imdb.com/images/M/MV5BMTczNjM0NDY0Ml5BMl5BcG5nXkFtZTgwMTk1MzQ2OTE@._V1_.png";

export default async function(args) {
  // clears command and func from array, gets final param
  args.shift();
  const func = args.shift();
  const param = encodeURI(args.join(" "));
  let result = new RichEmbed();
  result.setAuthor("IMDB/OMDB API", IMDB_LOGO, "http://www.omdbapi.com");

  switch (func) {
    case "find":
      result = await find(param, result);
      break;

    case "add":
      break;

    case "next":
      result = await next(param, result);
      break;

    default:
  }

  return result;
}

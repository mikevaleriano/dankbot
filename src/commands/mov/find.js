import axios from "axios";

const { OMDB_API_KEY } = process.env;
const REGEX_TT = new RegExp("^tt[0-9]{7}$");
const OMDB_BASE_URL = `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}`;

export default async function(param, result) {
  const findQuery = `${OMDB_BASE_URL}&${
    REGEX_TT.test(param) ? "i" : "t"
  }=${param}`;
  const temp = await axios.get(findQuery);
  const movie = temp.data;

  if (movie.Response === "False") {
    result.setTitle(`*${movie.Error}*`);
  } else {
    result.setTitle(`*${movie.Title}*`);

    result
      .addField("Genre", movie.Genre)
      .addField("Year", movie.Year, true)
      .addField("Runtime", movie.Runtime, true)
      .addField("IMDB identifier", movie.imdbID, true);

    if (movie.Ratings.length > 0) {
      movie.Ratings.forEach(i => {
        result.addField(
          `${i.Source.replace("Internet Movie Database", "IMDB")} score:`,
          i.Value,
          true
        );
      });
    }

    result.addField("Awards", movie.Awards).addField("Plot", movie.Plot);

    if (movie.Poster && movie.Poster !== "N/A") {
      result.setImage(movie.Poster);
    }
  }

  return result;
}

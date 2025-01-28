const url = "https://deezerdevs-deezer.p.rapidapi.com/search?q=eminem";
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "ad4ebc50e8msh21d6de872e740a5p1740a2jsn2f44656a84db",
    "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

try {
  const response = await fetch(url, options);
  const result = await response.text();
  console.log(result);
} catch (error) {
  console.error(error);
}

require("dotenv").config();

const express = require("express");
const res = require("express/lib/response");
const hbs = require("hbs");

// require spotify-web-api-node package here:
const SpotifyWebApi = require("spotify-web-api-node");

const app = express();

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));

// setting the spotify-api goes here:
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
});

// Retrieve an access token
spotifyApi
  .clientCredentialsGrant()
  .then((data) => spotifyApi.setAccessToken(data.body["access_token"]))
  .catch((error) =>
    console.log("Something went wrong when retrieving an access token", error)
  );

// Our routes go here:
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/artist-search", (req, res) => {
  //console.log(req.query.artistName);
  spotifyApi
    .searchArtists(req.query.artistName)
    .then((data) => {
      res.render("artist-search-results", { artists: data.body.artists.items });
      //res.json(data.body);
    })
    .catch((error) =>
      console.log("The error while searching the artists ocurred:", error)
    );
});

app.get("/albums/:id", (req, res) => {
  //const { id } = req.params;
  spotifyApi
    .getArtistAlbums(req.params.id)
    .then((data) => {
      //let searchAlbum = data.body.items;
      res.render("albums", { albums: data.body.items });
    })
    .catch((error) =>
      console.log("The error while searching the album ocurred:", error)
    );
  h;
});

app.get("/tracks/:id", (req, res) => {
  //const { id } = req.params;
  spotifyApi
    .getAlbumTracks(req.params.id)
    .then((data) => {
      //let searchTracks = data.body.items;
      res.render("tracks", { tracks: data.body.items });
    })
    .catch((error) =>
      console.log("The error while searching the tracks ocurred:", error)
    );
});

app.listen(process.env.PORT, () =>
  console.log("My Spotify project running on port 3000 🎧 🥁 🎸 🔊")
);

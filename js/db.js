import { endpoint } from "./app.js";
import Artist from "./model/artist.js";
import Release from "./model/release.js";
import Track from "./model/track.js";

//ARTISTS

async function readArtists() {
  const response = await fetch(`${endpoint}/artists`);
  const data = await response.json();
  return data.map(artistData => new Artist(artistData));
}

async function getArtistById(artistId) {
  const response = await fetch(`${endpoint}/artists/${artistId}`);
  const data = await response.json();
  return new Artist(data);
}

async function getArtistIdByName(artistName) {
  const artists = await readArtists();
  const selectedArtist = artists.find(artist => artist.artistName === artistName);
  return selectedArtist ? selectedArtist.id : null;
}

async function getFeaturingTracksByArtist(artistId) {
  const response = await fetch(`${endpoint}/artists/tracks/${artistId}`);
  const data = await response.json();
  return data;
}

//RELEASES

async function readReleases() {
  const response = await fetch(`${endpoint}/releases`);
  const data = await response.json();
  return data.map(releaseData => new Release(releaseData));
}

async function getReleaseById(releaseId) {
  const response = await fetch(`${endpoint}/releases/${releaseId}`);
  const data = await response.json();
  return new Release(data);
}

async function getReleaseIdByTitle(releaseTitle) {
  const releases = await readReleases();
  const selectedRelease = releases.find(release => release.releaseTitle === releaseTitle);
  return selectedRelease ? selectedRelease.id : null;
}

async function getReleasesByArtist(artistId) {
  const response = await fetch(`${endpoint}/releases/artist/${artistId}`);
  const data = await response.json();
  return data;
}

//TRACKS

async function readTracks() {
  const response = await fetch(`${endpoint}/tracks`);
  const data = await response.json();
  return data.map(trackData => new Track(trackData));
}

async function readTracksByRelease(releaseId) {
  const response = await fetch(`${endpoint}/tracks/release/${releaseId}`);
  const data = await response.json();
  return data;
}




export { readArtists, getArtistById, getArtistIdByName, getFeaturingTracksByArtist, readReleases, getReleaseById, getReleaseIdByTitle, getReleasesByArtist, readTracks, readTracksByRelease };

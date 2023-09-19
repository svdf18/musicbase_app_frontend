
import { endpoint } from "./app.js";

async function readArtists() {
  const response = await fetch(`${endpoint}/artists`);
  const data = await response.json();
  return data;
}

async function getArtistIdByName(artistName) {
  const artists = await readArtists();
  const selectedArtist = artists.find(artist => artist.artistName === artistName);
  return selectedArtist ? selectedArtist.artistId : null;
}

async function getFeaturingTracksByArtist(artistId) {
  const response = await fetch(`${endpoint}/tracks/${artistId}`);
  const data = await response.json();
  return data;
}

async function readReleases() {
  const response = await fetch(`${endpoint}/releases`);
  const data = await response.json();
  return data;
}

async function getReleaseIdByTitle(releaseTitle) {
  const releases = await readReleases();
  const selectedRelease = releases.find(release => release.releaseTitle === releaseTitle);
  return selectedRelease ? selectedRelease.releaseId : null;
}

async function readReleasesByArtist(artistId) {
  const response = await fetch(`${endpoint}/releases/artist/${artistId}`);
  const data = await response.json();
  return data;
}

async function readTracks() {
  const response = await fetch(`${endpoint}/tracks`);
  const data = await response.json();
  return data;
}

async function readTracksByRelease(releaseId) {
  const response = await fetch(`${endpoint}/tracks/release/${releaseId}`);
  const data = await response.json();
  return data;
}




export { readArtists, getArtistIdByName, getFeaturingTracksByArtist, readReleases, getReleaseIdByTitle, readReleasesByArtist, readTracks, readTracksByRelease };
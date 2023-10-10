import { readArtists, getArtistById, getArtistIdByName, getReleaseById, getReleaseIdByTitle, getReleasesByArtist, getFeaturingTracksByArtist, readTracksByRelease } from "./db.js";
import { clearTracksTable, clearFeaturingTracksTable, scrollToReleasesTable, scrollToTracksTable } from "./helpers.js";
import { handleSearch } from "./search.js";
import ListRenderer from "./view/list-renderer.js";
import { ArtistRenderer } from "./view/artist-renderer.js";
import { ReleaseRenderer } from "./view/release-renderer.js";
import { TrackRenderer } from "./view/track-renderer.js";


const endpoint = "https://musicbase-app-backend-production.azurewebsites.net/"
// const endpoint = "https://127.0.0.1:3333" // enable this endpoint if you want to run the app locally

window.addEventListener("load", initApp);

async function initApp() {
  const artists = await readArtists();

  const artistListRenderer = new ListRenderer(artists, "#artistTableBody", ArtistRenderer);
  artistListRenderer.render();
};

//Eventlistener for HeaderBtn & createforms

//Eventlistener for artist section

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#artistTableBody").addEventListener("click", async (event) => {
    const selectedArtistName = event.target.closest("tr").querySelector("td:first-child").textContent;
    const artistId = await getArtistIdByName(selectedArtistName);
    if (artistId) {
      clearTracksTable();
      clearFeaturingTracksTable();
      displayReleasesByArtist(artistId);
      displayFeaturingTracksByArtist(artistId);
      scrollToReleasesTable() 
    };
  });
});

//Eventlistener for release section

document.querySelector("#releaseTableBody").addEventListener("click", async (event) => {
  const selectedReleaseTitle = event.target.closest("tr").querySelector("td:first-child").textContent;
  const releaseId = await getReleaseIdByTitle(selectedReleaseTitle);
  if (releaseId) {
    displayTracksOnRelease(releaseId);
    scrollToTracksTable();
  }
});

// Eventlistener for the searchbar
document.querySelector("#searchBar").addEventListener("input", handleSearch);

//Display releases w. clicked artist as Primary Artist

async function displayReleasesByArtist(artistId) {
  const artist = await getArtistById(artistId);
  const releases = await getReleasesByArtist(artistId);

  const releasesHeading = document.querySelector("#releaseGridContainerL h3");
  if (releasesHeading) {
    releasesHeading.textContent = `${artist.artistName} Releases as Primary Artist`;
  }

  const releaseListRenderer = new ListRenderer(releases, "#releaseTableBody", ReleaseRenderer);
  releaseListRenderer.render();
};

//Display releases w. clicked artist as Featuring Artist
async function displayFeaturingTracksByArtist(artistId) {
  const artist = await getArtistById(artistId);
  const featuringTracks = await getFeaturingTracksByArtist(artistId);

  const featuringTracksHeading = document.querySelector("#releaseGridContainerR h3");
  if (featuringTracksHeading) {
    featuringTracksHeading.textContent = `${artist.artistName} Releases as Featuring Artist`;
  }

  const filteredFeaturingTracks = featuringTracks.filter(track => track.artistRole === 'FEATURING ARTIST');

  if (filteredFeaturingTracks.length > 0) {
    const featuringTracksListRenderer = new ListRenderer(filteredFeaturingTracks, "#featuringTracksTableBody", TrackRenderer);

    featuringTracksListRenderer.render();
  }
}


//Display tracks on clicked release

async function displayTracksOnRelease(releaseId) {
  const release = await getReleaseById(releaseId);
  const tracks = await readTracksByRelease(releaseId);

  const tracksHeading = document.querySelector("#tracksTableHeading");
  if (tracksHeading) {
    tracksHeading.textContent = `Tracklist for ${release.releaseTitle}`;
  }

  const tracksListRenderer = new ListRenderer(tracks, "#tracksTableBody", TrackRenderer);
  tracksListRenderer.render();
}

export { endpoint };
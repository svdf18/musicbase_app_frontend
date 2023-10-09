import { readArtists, getArtistById, getArtistIdByName, readReleases, getReleaseById, getReleaseIdByTitle, getReleasesByArtist, getFeaturingTracksByArtist, readTracks, readTracksByRelease } from "./db.js";
import { clearTracksTable, scrollToReleasesTable, scrollToTracksTable } from "./helpers.js";
import { handleSearch } from "./search.js";
import ListRenderer from "./list-renderer.js";
import { ArtistRenderer } from "./artist-renderer.js";
import { ReleaseRenderer } from "./release-renderer.js";
import { TrackRenderer } from "./track-renderer.js";



const endpoint = "https://musicbase-app-backend-production.azurewebsites.net/"
// const endpoint = "https://127.0.0.1:3333" // enable this endpoint if you want to run the app locally

window.addEventListener("load", initApp);

async function initApp() {
  const artists = await readArtists();

  const artistListRenderer = new ListRenderer(artists, "#artistTableBody", ArtistRenderer);

  artistListRenderer.render();

  const releaseData = await readReleases();
  const trackData = await readTracks();
};

//Eventlistener for HeaderBtn & createforms

//Eventlistener for artist section

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#artistTableBody").addEventListener("click", async (event) => {
    const selectedArtistName = event.target.closest("tr").querySelector("td:first-child").textContent;
    const artistId = await getArtistIdByName(selectedArtistName);
    if (artistId) {
      clearTracksTable();
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

  console.log('Artist:', artist);

  // Log the API response for debugging
  console.log('API Response:', featuringTracks);

  const featuringTracksHeading = document.querySelector("#releaseGridContainerR h3");
  if (featuringTracksHeading) {
    featuringTracksHeading.textContent = `${ artist.artistName } Releases as Featuring Artist`;
  }

  const featuringTracksTableBody = document.querySelector("#featuringTracksTableBody");
  featuringTracksTableBody.innerHTML = "";

  featuringTracks.forEach(track => {
    if (track.artistRole === 'FEATURING ARTIST') {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${track.trackTitle || ''}</td>
      `;
      featuringTracksTableBody.appendChild(row);
    }
  });
};


//Display tracks on clicked release

async function displayTracksOnRelease(releaseId) {
  const release = await getReleaseById(releaseId);
  const tracks = await readTracksByRelease(releaseId);

  const tracksHeading = document.querySelector("#tracksTableHeading");
  if (tracksHeading) {
    tracksHeading.textContent = `Tracklist for ${release.releaseTitle}`;
  };

  const tracksTableBody = document.querySelector("#tracksTableBody");
  tracksTableBody.innerHTML = "";

  tracks.forEach(track => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${track.trackTitle}</td
    `;
    tracksTableBody.appendChild(row);
  });
};


export { endpoint };
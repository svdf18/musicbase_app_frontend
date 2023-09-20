import { readArtists, getArtistById, getArtistIdByName, readReleases, getReleaseById, getReleaseIdByTitle, readReleasesByArtist, readTracks, readTracksByRelease } from "./db.js";
import { clearTracksTable, scrollToReleasesTable, scrollToTracksTable } from "./helpers.js";
import { searchArtists, searchReleases,searchTracks, handleGeneralSearch } from "./search.js"

const endpoint = "http://localhost:3333"

window.addEventListener("load", initApp);

async function initApp() {
  const artists = await readArtists();
  displayArtistList();

  const releaseData = await readReleases();
  const trackData = await readTracks();
}

//Eventlistener for artist section

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#artistTableBody").addEventListener("click", async (event) => {
    const selectedArtistName = event.target.closest("tr").querySelector("td:first-child").textContent;
    const artistId = await getArtistIdByName(selectedArtistName);
    if (artistId) {
      clearTracksTable();
      displayReleasesByArtist(artistId);
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

//Eventlistener for the searchbar

document.querySelector("#searchBar").addEventListener("input", async (event) => {
  const searchQuery = event.target.value;
  const artistTableBody = document.querySelector("#artistTableBody");
  const releaseTableBody = document.querySelector("#releaseTableBody");
  const tracksTableBody = document.querySelector("#tracksTableBody");

  if (searchQuery) {
    handleGeneralSearch(searchQuery, artistTableBody, searchArtists, ["artistName", "realName", "city", "activeSince"]);
    handleGeneralSearch(searchQuery, releaseTableBody, searchReleases, ["releaseTitle", "releaseYear", "label"]);
    handleGeneralSearch(searchQuery, tracksTableBody, searchTracks, ["trackTitle"]);
  } else {
    handleGeneralSearch("", artistTableBody, searchArtists, ["artistName", "realName", "city", "activeSince"]);
    releaseTableBody.innerHTML = "";
    tracksTableBody.innerHTML = "";
  }
});

//Display artist list

async function displayArtistList() {
  const artistData = await readArtists();

  const artistTableBody = document.querySelector("#artistTableBody");

  artistData.forEach(artist => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${artist.artistName}</td>
        <td>${artist.realName}</td>
        <td>${artist.city}</td>
        <td>${artist.activeSince}</td>
    `;
    artistTableBody.appendChild(row);
  });
}

//Display releases w. clicked artist as Primary Artist

async function displayReleasesByArtist(artistId) {
  const artist = await getArtistById(artistId);
  const releases = await readReleasesByArtist(artistId);

  const releasesHeading = document.querySelector("#releaseGridContainerL h3");
  if (releasesHeading) {
    releasesHeading.textContent = `${artist.artistName} Releases as Primary Artist`;
  }
  const releasesTableBody = document.querySelector("#releaseTableBody");
  releasesTableBody.innerHTML = "";

  releases.forEach(release => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${release.releaseTitle}</td>
        <td>${release.releaseYear}</td>
        <td>${release.label}</td>
    `;
    releaseTableBody.appendChild(row);
  });
};

//Display releases w. clicked artist as Featuring Artist

async function displayFeaturingTracksByArtist(artistId) {
  const featuringTracks = await getFeaturingTracksByArtist(artistId);
  const featuringTracksTableBody = document.querySelector("#featuringTracksTableBody");
  featuringTracksTableBody.innerHTML = "";
  featuringTracks.forEach(track => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${track.trackTitle}</td>
    `;
    featuringTracksTableBody.appendChild(row);
  });
}

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
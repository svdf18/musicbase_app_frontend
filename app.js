import { readArtists, getArtistIdByName, getFeaturingTracksByArtist, readReleases, getReleaseIdByTitle, readReleasesByArtist, readTracks, readTracksByRelease } from "./db.js";
import { clearTracksTable } from "./helper.js";

const endpoint = "http://localhost:3333"

window.addEventListener("load", initApp);

document.querySelector("#artistTableBody").addEventListener("click", async (event) => {
  const selectedArtistName = event.target.closest("tr").querySelector("td:first-child").textContent;
  const artistId = await getArtistIdByName(selectedArtistName);
  if (artistId) {
    clearTracksTable();
    displayReleasesByArtist(artistId);
    displayFeaturingTracksByArtist(artistId);
  }
});

document.querySelector("#releaseTableBody").addEventListener("click", async (event) => {
  const selectedReleaseTitle = event.target.closest("tr").querySelector("td:first-child").textContent;
  const releaseId = await getReleaseIdByTitle(selectedReleaseTitle);
  if (releaseId) {
    displayTracksOnRelease(releaseId);
  }
});

async function initApp() {
  const artists = await readArtists();
  displayArtistList();

  const releaseData = await readReleases();
  const trackData = await readTracks();

  console.log(releaseData);
  console.log(trackData);
}

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

async function displayReleasesByArtist(artistId) {
  const releases = await readReleasesByArtist(artistId);
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

async function displayTracksOnRelease(releaseId) {
  const tracks = await readTracksByRelease(releaseId);
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
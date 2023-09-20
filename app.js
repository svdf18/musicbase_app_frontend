import { readArtists, getArtistIdByName, readReleases, getReleaseIdByTitle, readReleasesByArtist, readTracks, readTracksByRelease } from "./db.js";
import { clearTracksTable, scrollToReleasesTable, scrollToTracksTable } from "./helpers.js";

const endpoint = "http://localhost:3333"

window.addEventListener("load", initApp);

//Eventlistener for artist section

document.querySelector("#artistTableBody").addEventListener("click", async (event) => {
  const selectedArtistName = event.target.closest("tr").querySelector("td:first-child").textContent;
  const artistId = await getArtistIdByName(selectedArtistName);
  if (artistId) {
    clearTracksTable();
    displayReleasesByArtist(artistId);
    scrollToReleasesTable() 
  };
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

async function initApp() {
  const artists = await readArtists();
  displayArtistList();

  const releaseData = await readReleases();
  const trackData = await readTracks();

  console.log(releaseData);
  console.log(trackData);
}

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

//Display releases w. clicked artist as Featuring Artist

// async function displayFeaturingTracksByArtist(artistId) {
//   const featuringTracks = await getFeaturingTracksByArtist(artistId);
//   const featuringTracksTableBody = document.querySelector("#featuringTracksTableBody");
//   featuringTracksTableBody.innerHTML = "";
//   featuringTracks.forEach(track => {
//     const row = document.createElement('tr');
//     row.innerHTML = `
//       <td>${track.trackTitle}</td>
//     `;
//     featuringTracksTableBody.appendChild(row);
//   });
// }

//Display tracks on clicked release

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
//Clear tracks table

function clearTracksTable() {
  const tracksTableBody = document.querySelector("#tracksTableBody");
  tracksTableBody.innerHTML = "";
}

function clearFeaturingTracksTable() {
  const featuringTracksTableBody = document.querySelector("#featuringTracksTableBody");
  featuringTracksTableBody.innerHTML = "";
}

//Scroll on click

function scrollToReleasesTable() {
  const releasesTable = document.querySelector("#releaseTableBody");
  if (releasesTable) {
    releasesTable.scrollIntoView({ behavior: "smooth" });
  }
}

function scrollToTracksTable() {
  const tracksTable = document.querySelector("#tracksTableBody");
  if (tracksTable) {
    tracksTable.scrollIntoView({ behavior: "smooth" });
  }
}

export { clearTracksTable, clearFeaturingTracksTable, scrollToReleasesTable, scrollToTracksTable };

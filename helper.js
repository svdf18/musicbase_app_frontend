function clearTracksTable() {
  const tracksTableBody = document.querySelector("#tracksTableBody");
  tracksTableBody.innerHTML = "";
}

export { clearTracksTable };
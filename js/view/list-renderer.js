export default class ListRenderer {
  constructor(list, container, itemRenderer) {
    this.items = list;
    this.container = document.querySelector(container);
    this.itemRenderer = itemRenderer;
  }

  render() {
    this.container.innerHTML = "";
    for (const item of this.items) {
      const html = this.itemRenderer.render(item);
      this.container.insertAdjacentHTML("beforeend", html);
    }
  }

  clearTracksTable() {
  const tracksTableBody = document.querySelector("#tracksTableBody");
  tracksTableBody.innerHTML = "";
}

 clearTable(tableBody) {
  if (tableBody) {
    tableBody.innerHTML = "";
  }
}

showResults(tableBody, results, displayColumns) {
  results.forEach((result) => {
    const row = document.createElement('tr');
    displayColumns.forEach((column) => {
      const cell = document.createElement('td');
      cell.textContent = result[column];
      row.appendChild(cell);
    });
    tableBody.appendChild(row);
  });
};

}

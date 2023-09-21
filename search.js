import { endpoint } from "./app.js";

// Function to get the appropriate search function based on the selected category

async function handleSearch(event) {
  const searchQuery = event.target.value;
  const selectedCategory = document.querySelector("#headerBtn").value;
  const artistTableBody = document.querySelector("#artistTableBody");
  const releaseTableBody = document.querySelector("#releaseTableBody");
  const tracksTableBody = document.querySelector("#tracksTableBody");

  clearTables(artistTableBody, releaseTableBody, tracksTableBody);

  if (searchQuery) {
    if (selectedCategory === "general") {
      handleGeneralSearch(searchQuery, artistTableBody, searchArtists, ["artistName", "realName", "city", "activeSince"]);
      handleGeneralSearch(searchQuery, releaseTableBody, searchReleases, ["releaseTitle", "releaseYear", "label"]);
      handleGeneralSearch(searchQuery, tracksTableBody, searchTracks, ["trackTitle"]);
    } else {
      const searchFunction = getCategorySearchFunction(selectedCategory);
      const displayColumns = getCategoryDisplayColumns(selectedCategory);

      const tableBody = getTableBody(selectedCategory, artistTableBody, releaseTableBody, tracksTableBody);
      handleGeneralSearch(searchQuery, tableBody, searchFunction, displayColumns);
    }
  } else {
    const tableBody = getTableBody(selectedCategory, artistTableBody, releaseTableBody, tracksTableBody);
    handleGeneralSearch("", tableBody, getCategorySearchFunction(selectedCategory), getCategoryDisplayColumns(selectedCategory));
  }
}

// Function to clear tables based on the selected category

function clearTables(artistTableBody, releaseTableBody, tracksTableBody) {
  clearTable(artistTableBody);
  clearTable(releaseTableBody);
  clearTable(tracksTableBody);
}

// Function to determine the table body based on the selected category

function getTableBody(selectedCategory, artistTableBody, releaseTableBody, tracksTableBody) {
  switch (selectedCategory) {
    case "artists":
      return artistTableBody;
    case "releases":
      return releaseTableBody;
    case "tracks":
      return tracksTableBody;
    default:
      return null;
  }
}

// Function to get the appropriate search function based on the selected category

function getCategorySearchFunction(category) {
  switch (category) {
    case "artists":
      return searchArtists;
    case "releases":
      return searchReleases;
    case "tracks":
      return searchTracks;
    default:
      return null;
  }
}

// Function to get the appropriate display columns based on the selected category

function getCategoryDisplayColumns(category) {
  switch (category) {
    case "artists":
      return ["artistName", "realName", "city", "activeSince"];
    case "releases":
      return ["releaseTitle", "releaseYear", "label"];
    case "tracks":
      return ["trackTitle"];
    default:
      return [];
  }
}

// Function to search for artists based on a search query

async function searchArtists(searchQuery) {
  const response = await fetch(`${endpoint}/artists/search/query?q=${searchQuery}`);
  const data = await response.json();
  return data;
};

// Function to search for releases based on a search query

async function searchReleases(searchQuery) {
  const response = await fetch(`${endpoint}/releases/search/query?q=${searchQuery}`);
  const data = await response.json();
  return data;
};

// Function to search for tracks based on a search query

async function searchTracks(searchQuery) {
  const response = await fetch(`${endpoint}/tracks/search/query?q=${searchQuery}`);
  const data = await response.json();
  return data;
};

// General management of handling and showing search results

async function handleGeneralSearch(searchQuery, tableBody, searchFunction, displayColumns) {
  clearTable(tableBody);

  if (searchFunction) {
    if (searchQuery) {
      const searchResults = await searchFunction(searchQuery);

      if (searchResults.length > 0) {
        showResults(tableBody, searchResults, displayColumns);
      } else {
        displayNoResultsMessage(tableBody, displayColumns);
      }
    } else {
      const allItems = await searchFunction("");
      if (allItems.length > 0) {
        showResults(tableBody, allItems, displayColumns);
      } else {
        displayNoResultsMessage(tableBody, displayColumns);
      }
    }
  }
}

// Clears content of table

function clearTable(tableBody) {
  if (tableBody) {
    tableBody.innerHTML = "";
  }
}

// Populates table with search results

function showResults(tableBody, results, displayColumns) {
  results.forEach((result) => {
    const row = createTableRow(result, displayColumns);
    tableBody.appendChild(row);
  });
};

// Generates row with found data

function createTableRow(data, displayColumns) {
  const row = document.createElement('tr');
  displayColumns.forEach((column) => {
    const cell = document.createElement('td');
    cell.textContent = data[column];
    row.appendChild(cell);
  });
  return row;
};

// Displays message

function displayNoResultsMessage(tableBody, displayColumns) {
  const row = createMessageRow(`No results found.`, displayColumns.length);
  tableBody.appendChild(row);
};

// Fits message to row and columns

function createMessageRow(message, colspan) {
  const row = document.createElement('tr');
  const cell = document.createElement('td');
  cell.textContent = message;
  cell.colSpan = colspan;
  row.appendChild(cell);
  return row;
};

export { handleSearch};
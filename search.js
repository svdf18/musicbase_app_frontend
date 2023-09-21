import { endpoint } from "./app.js";

//Function to search for artists based on a search query

async function searchArtists(searchQuery) {
  const response = await fetch(`${endpoint}/artists/search?q=${searchQuery}`);
  const data = await response.json();
  return data;
};

//Function to search for releases based on a search query

async function searchReleases(searchQuery) {
  const response = await fetch(`${endpoint}/releases/search?q=${searchQuery}`);
  const data = await response.json();
  return data;
};

//Function to search for tracks based on a search query

async function searchTracks(searchQuery) {
  const response = await fetch(`${endpoint}/tracks/search?q=${searchQuery}`);
  const data = await response.json();
  return data;
};

//General managment of handling and showing search results

async function handleGeneralSearch(searchQuery, tableBody, searchFunction, displayColumns) {
  clearTable(tableBody);

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
};

//Clears content of table

function clearTable(tableBody) {
  tableBody.innerHTML = "";
};

//Populates table with search results

function showResults(tableBody, results, displayColumns) {
  results.forEach((result) => {
    const row = createTableRow(result, displayColumns);
    tableBody.appendChild(row);
  });
};

//Generates row with found data

function createTableRow(data, displayColumns) {
  const row = document.createElement('tr');
  displayColumns.forEach((column) => {
    const cell = document.createElement('td');
    cell.textContent = data[column];
    row.appendChild(cell);
  });
  return row;
};

//Displays message

function displayNoResultsMessage(tableBody, displayColumns) {
  const row = createMessageRow(`No results found.`, displayColumns.length);
  tableBody.appendChild(row);
};

//Fits message to row and columns

function createMessageRow(message, colspan) {
  const row = document.createElement('tr');
  const cell = document.createElement('td');
  cell.textContent = message;
  cell.colSpan = colspan;
  row.appendChild(cell);
  return row;
};

export { searchArtists, searchReleases,searchTracks, handleGeneralSearch };  
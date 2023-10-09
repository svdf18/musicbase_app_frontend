export const ArtistRenderer = {
  render(artist) {
    const html = `
      <tr>
        <td>${artist.artistName}</td>
        <td>${artist.realName}</td>
        <td>${artist.city}</td>
        <td>${artist.activeSince}</td>
      </tr>
    `;
    return html;
  },
};
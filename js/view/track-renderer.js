export const TrackRenderer = {
  render(track) {
    const html = `
      <tr>
        <td>${track.trackTitle}</td>
      </tr>
    `;
    return html;
  },
};

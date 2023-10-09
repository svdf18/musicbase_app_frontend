export const ReleaseRenderer = {
  render(release) {
    const html = `
      <tr>
        <td>${release.releaseTitle}</td>
        <td>${release.releaseYear}</td>
        <td>${release.label}</td>
      </tr>
    `;
    return html;
  },
};
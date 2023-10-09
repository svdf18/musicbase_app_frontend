export function construct(artistData) {
  const ArtistObject = {
    id: artistData.id, // Assuming you have an ID property in your artist data
    artistName: artistData.artistName,
    realName: artistData.realName,
    city: artistData.city,
    activeSince: artistData.activeSince,
  };

  Object.defineProperty(ArtistObject, "id", {
    configurable: false,
    writable: false,
  });

  return ArtistObject;
}
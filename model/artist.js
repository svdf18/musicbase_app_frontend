export function construct(artistData) {
  const ArtistObject = {
    id: artistData.id,
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
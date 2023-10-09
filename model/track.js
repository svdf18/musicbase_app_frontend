export function construct(trackData) {
  const tracjObject = {
    id: trackData.id,
    trackTitle: trackData.trackTitle,
  };

  Object.defineProperty(TrackObject, "id", {
    configurable: false,
    writable: false
  });

  return TrackObject;
}

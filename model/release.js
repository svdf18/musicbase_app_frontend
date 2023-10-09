export function construct(releaseData) {
  const ReleaseObject = {
    id: releaseData.id,
    releaseName: releaseData.releaseName,
    releaseTitle: releaseData.releaseTitle,
    releaseYear: releaseData.releaseYear,
    label: releaseData.label,
  };

  Object.defineProperty(ReleaseObject, "id", {
    configurable: false,
    writable: false
  });

  return ReleaseObject;
}

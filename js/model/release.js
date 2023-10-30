export default class Release {
 constructor(releaseData) {
    this.id = releaseData.releaseId;
    this.releaseTitle = releaseData.releaseTitle;
    this.releaseYear = releaseData.releaseYear;
    this.label = releaseData.label;

    Object.defineProperty(this, 'id', {
      configurable: false,
      writable: false
     });
    };
}

export default class Artist {
 constructor(artistData) {
    this.id = artistData.artistId;
    this.artistName = artistData.artistName;
    this.realName = artistData.realName;
    this.city = artistData.city;
    this.activeSince = artistData.activeSince;

     Object.defineProperty(this, 'id', {
      configurable: false,
      writable: false
     });
  };
}
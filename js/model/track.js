export default class Track {
 constructor(trackData) {
    this.id = trackData.trackId;
    this.trackTitle = trackData.trackTitle;
    
    Object.defineProperty(this, 'id', {
      configurable: false,
      writable: false
     });
    };
}

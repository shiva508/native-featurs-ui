class Palce {
  constructor(title, imageUrl, location, id) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.address = location.address;
    this.location = { lat: location.lat, lng: location.lng };
    this.id = id;
  }
}
export default Palce;

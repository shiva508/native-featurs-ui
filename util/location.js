import axios from "axios";

export function getMapPreview(lat, lng) {
  return "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png";
}

export async function getAddress(lat, lng) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;
  const response = await axios.get(url);

  const reses = await response.data;
  const displayAddress = reses.display_name;
  console.log(displayAddress);
  return displayAddress;
}

import PlaceForm from "../components/places/PlaceForm";
import { insertPlace } from "../util/database";

const AddPlace = ({ navigation }) => {
  const createLocationHandler = async (locationinfo) => {
    await insertPlace(locationinfo);
    navigation.navigate("AllPlaces");
  };

  return <PlaceForm addLocation={createLocationHandler} />;
};
export default AddPlace;

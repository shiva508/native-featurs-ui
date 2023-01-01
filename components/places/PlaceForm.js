import { useCallback, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { GlobalColors } from "../../constants/colors";
import CustomButton from "../ui/CustomButton";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Place from "../../model/place";
const PlaceForm = ({ addLocation }) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const [pickedLocation, setPickedLocation] = useState();

  const titleChangeHandler = (enteredText) => {
    setEnteredTitle(enteredText);
  };
  const savePlaceHandler = () => {
    const placeData = new Place(enteredTitle, selectedImage, pickedLocation);
    if (placeData) {
      addLocation(placeData);
    }
  };
  const takeImageHandler = (imageUrl) => {
    setSelectedImage(imageUrl);
  };
  const pickLocationHandler = useCallback((location) => {
    setPickedLocation(location);
  }, []);

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={titleChangeHandler}
          value={enteredTitle}
        ></TextInput>
      </View>
      <ImagePicker onImageTaken={takeImageHandler} />
      <LocationPicker onLocationPicked={pickLocationHandler} />
      <CustomButton onPress={savePlaceHandler}>Add Place</CustomButton>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: GlobalColors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: GlobalColors.primary700,
    borderBottomWidth: 2,
    backgroundColor: GlobalColors.primary100,
  },
});
export default PlaceForm;

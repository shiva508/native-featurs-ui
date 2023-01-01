import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import OutlinedButton from "../components/ui/OutlinedButton";
import { GlobalColors } from "../constants/colors";
import { getPlaceById } from "../util/database";

const PlaceDetails = ({ route, navigation }) => {
  const [selectedPlace, setSelectedPlace] = useState();
  const selectedPlaceId = route?.params?.id;
  const showOnMapHandler = () => {
    navigation.navigate("Map", {
      initialLat: selectedPlace.location.lat,
      initialLng: selectedPlace.location.lng,
    });
  };

  useEffect(() => {
    const loadPlaceData = async () => {
      const place = await getPlaceById(selectedPlaceId);
      setSelectedPlace(place);
      navigation.setOptions({
        title: place.title,
      });
    };
    loadPlaceData();
  }, [selectedPlaceId]);
  if (!selectedPlace) {
    return (
      <View style={styles.fallback}>
        <Text>Loading place</Text>
      </View>
    );
  }
  return (
    <ScrollView>
      <Text> Data{selectedPlace.imageUrl}</Text>
      <Image
        style={styles.image}
        source={{ uri: selectedPlace.imageUrl }}
      ></Image>
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}> {selectedPlace.address}</Text>
        </View>
        <OutlinedButton iconname="map" onPress={showOnMapHandler}>
          View On Map
        </OutlinedButton>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  fallback: { flex: 1, justifyContent: "center", alignItems: "center" },
  screen: {
    alignItems: "center",
  },
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: GlobalColors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
export default PlaceDetails;

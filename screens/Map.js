import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import IconButton from "../components/ui/IconButton";

const Map = ({ navigation }) => {
  const [selectedLocation, setSelectedLocation] = useState();
  const region = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  const selectLocationHandler = (event) => {
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;
    setSelectedLocation({ lat: lat, lng: lng });
  };

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        "No Location is Plicked",
        "You have to pick ocation by tapping "
      );
      return;
    }
    navigation.navigate("AddPlace", {
      pickedLat: selectedLocation.lat,
      pickedLng: selectedLocation.lng,
    });
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          iconname="save"
          size={24}
          color={tintColor}
          onPress={savePickedLocationHandler}
        />
      ),
    });
  }, [navigation, savePickedLocationHandler]);
  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
        ></Marker>
      )}
    </MapView>
  );
};
const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
export default Map;

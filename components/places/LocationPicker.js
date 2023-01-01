import { Image, StyleSheet, Text, View } from "react-native";
import { GlobalColors } from "../../constants/colors";
import OutlinedButton from "../ui/OutlinedButton";
import {
  getCurrentPositionAsync,
  PermissionStatus,
  useForegroundPermissions,
} from "expo-location";
import { useEffect, useState } from "react";
import { getAddress, getMapPreview } from "../../util/location";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

const LocationPicker = ({ onLocationPicked }) => {
  const [pickedLocation, setPickedLocation] = useState();

  const [locationPermissionInfo, requestPermission] =
    useForegroundPermissions();

  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = {
        lat: route.params.pickedLat,
        lng: route.params.pickedLng,
      };
      setPickedLocation(mapPickedLocation);
    }
  }, [route, isFocused]);

  useEffect(() => {
    const locationInner = async () => {
      if (pickedLocation) {
        const address = await getAddress(
          pickedLocation.lat,
          pickedLocation.lat
        );
        onLocationPicked({ ...pickedLocation, address: address });
      }
    };
    locationInner();
  }, [pickedLocation, pickedLocation]);

  const verifyPermission = async () => {
    if (locationPermissionInfo.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (locationPermissionInfo.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permission",
        "You need to grant permission to use this app"
      );
      return false;
    }
    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      return;
    }
    const location = await getCurrentPositionAsync();
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  };
  const packOnMapHandler = () => {
    navigation.navigate("Map");
  };

  let locationPreview = <Text>No Image is taken</Text>;
  if (pickedLocation) {
    locationPreview = (
      <Image
        style={styles.image}
        source={{
          uri: getMapPreview(pickedLocation.lat, pickedLocation.lng),
        }}
      />
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlinedButton iconname="location" onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton iconname="map" onPress={packOnMapHandler}>
          Pick On Map
        </OutlinedButton>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: GlobalColors.primary100,
    borderRadius: 4,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
export default LocationPicker;

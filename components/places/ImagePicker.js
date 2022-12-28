import {
  launchCameraAsync,
  PermissionStatus,
  useCameraPermissions,
} from "expo-image-picker";
import { useState } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { GlobalColors } from "../../constants/colors";
import OutlinedButton from "../ui/OutlinedButton";

const ImagePicker = () => {
  const [pickedImage, setPickedImage] = useState();
  const [useCameraPermissionsInfo, requestPermission] = useCameraPermissions();
  const verifyPermissions = async () => {
    if (useCameraPermissionsInfo.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (useCameraPermissionsInfo.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permission",
        "You need to grant permission to use this app"
      );
      return false;
    }
    return true;
  };

  const takeImageHnadler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setPickedImage(image.assets[0].uri);
  };
  let previewImage = <Text>No Image is taken</Text>;
  if (pickedImage) {
    previewImage = (
      <Image style={styles.image} source={{ uri: pickedImage }}></Image>
    );
  }
  return (
    <View>
      <View style={styles.imagePreview}>{previewImage}</View>
      <OutlinedButton iconname="camera" onPress={takeImageHnadler}>
        Take Image
      </OutlinedButton>
    </View>
  );
};
const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: GlobalColors.primary100,
    borderRadius: 4,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
export default ImagePicker;

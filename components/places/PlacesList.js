import { useNavigation } from "@react-navigation/native";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { GlobalColors } from "../../constants/colors";
import PlaceItem from "./PlaceItem";

const PlacesList = ({ places }) => {
  const navigation = useNavigation();

  const placeDetailsHandler = (id) => {
    navigation.navigate("PlaceDetails", { id: id });
  };

  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No places are added,please start adding
        </Text>
      </View>
    );
  }
  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <PlaceItem place={item} onSelect={placeDetailsHandler} />
      )}
    />
  );
};
const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
    color: GlobalColors.primary200,
  },
});
export default PlacesList;

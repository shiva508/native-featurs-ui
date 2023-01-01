import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IconButton from "../components/ui/IconButton";
import { GlobalColors } from "../constants/colors";
import AddPlace from "../screens/AddPlace";
import AllPlaces from "../screens/AllPlaces";
import Map from "../screens/Map";
import PlaceDetails from "../screens/PlaceDetails";

const Stack = createNativeStackNavigator();

const SpStackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: GlobalColors.primary500 },
          headerTintColor: GlobalColors.gray700,
          contentStyle: { backgroundColor: GlobalColors.gray700 },
        }}
      >
        <Stack.Screen
          name="AllPlaces"
          component={AllPlaces}
          options={({ navigation }) => ({
            title: "Your Favorate Place",
            headerRight: ({ tintColor }) => (
              <IconButton
                iconname="add"
                size={24}
                color={tintColor}
                onPress={() => {
                  navigation.navigate("AddPlace");
                }}
              />
            ),
          })}
        />
        <Stack.Screen
          name="AddPlace"
          component={AddPlace}
          options={{ title: "Add Place" }}
        />
        <Stack.Screen name="Map" component={Map} options={{ title: "Map" }} />
        <Stack.Screen
          name="PlaceDetails"
          component={PlaceDetails}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default SpStackNavigation;

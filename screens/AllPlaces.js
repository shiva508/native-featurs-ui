import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import PlacesList from "../components/places/PlacesList";
import { fetchAllPlaces } from "../util/database";

const AllPlaces = () => {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    async function fetchAll() {
      const places = await fetchAllPlaces();
      setLoadedPlaces(places);
    }
    if (isFocused) {
      fetchAll();
    }
  }, [isFocused]);

  return <PlacesList places={loadedPlaces} />;
};
export default AllPlaces;

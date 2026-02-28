import { StyleSheet } from "react-native";
import PlacesList from "../components/Places/PlacesList";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";

export default function AllPlaces({ route }) {
  const isFocused = useIsFocused();
  const [loadedPlaces, setLoadedPlaces] = useState([]);

  useEffect(() => {
    if (isFocused && route.params) {
      setLoadedPlaces((currentPlaces) => [
        ...currentPlaces,
        route.params.place,
      ]);
    }
  }, [isFocused, route]);

  return <PlacesList places={loadedPlaces} />;
}

const styles = StyleSheet.create({});

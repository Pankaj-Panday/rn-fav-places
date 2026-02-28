import { StyleSheet } from "react-native";
import PlaceForm from "../components/Places/PlaceForm";
import { insertPlace } from "../util/database";

export default function AddPlace({ navigation, route }) {
  async function createPlaceHandler(place) {
    await insertPlace(place);
    navigation.navigate("AllPlaces", {
      place: place,
    });
  }

  return <PlaceForm onCreatePlace={createPlaceHandler} route={route} />;
}

const styles = StyleSheet.create({});

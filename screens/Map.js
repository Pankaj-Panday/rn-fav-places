import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";
import IconButton from "../components/Ui/IconButton";

export default function Map({ navigation }) {
  const [selectedLocation, setSelectedLocation] = useState();

  const html = `
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css"/>
<script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
<style>
html, body, #map {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
</style>
</head>
<body>
<div id="map"></div>
<script>
var map = L.map('map').setView([28.6139, 77.2090], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
  .addTo(map);

var marker;

map.on('click', function(e) {
  var lat = e.latlng.lat;
  var lng = e.latlng.lng;

  if (marker) {
    map.removeLayer(marker);
  }

  marker = L.marker([lat, lng]).addTo(map);

  window.ReactNativeWebView.postMessage(
    JSON.stringify({ lat: lat, lng: lng })
  );
});
</script>
</body>
</html>
`;

  function handleMapMessage(event) {
    const data = JSON.parse(event.nativeEvent.data);
    setSelectedLocation(data);
  }

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        "No location picked!",
        "Please pick a location by tapping on the map.",
      );
      return;
    }

    navigation.popTo("AddPlace", {
      pickedLat: selectedLocation.lat,
      pickedLng: selectedLocation.lng,
    });
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon={"save"}
          size={24}
          color={tintColor}
          onPress={savePickedLocationHandler}
        />
      ),
    });
  }, [navigation, savePickedLocationHandler]);

  return (
    <View style={styles.container}>
      <WebView
        source={{ html }}
        onMessage={handleMapMessage}
        originWhitelist={["*"]}
        javaScriptEnabled
        domStorageEnabled
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

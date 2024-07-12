import { View } from "native-base";

import { ButtonsOverlay } from "./components/ButtonsOverlay";
import { FFMapView } from "./components/FFMapView";

export const Main = () => (
  <View width="100%" height="100%">
    <FFMapView />
    <ButtonsOverlay />
  </View>
);

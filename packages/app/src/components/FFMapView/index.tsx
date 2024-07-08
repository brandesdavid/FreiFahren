import MapLibreGL, {
  Camera,
  LineLayer,
  MapView,
  ShapeSource,
  UserLocation,
  UserTrackingMode,
} from "@maplibre/maplibre-react-native";
import Geolocation from "@react-native-community/geolocation";
import { noop } from "lodash";
import { Stack, Text, useTheme, View } from "native-base";
import { useEffect, useState } from "react";
import { Platform, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Report, useReports } from "../../api";
import { config } from "../../config";
import lines from "../../data/line-segments.json";
import { Theme } from "../../theme";
import { FFBox } from "../common/FFBox";
import { FFSpinner } from "../common/FFSpinner";
import { Attribution } from "./Attribution";
import { ReportDetailsNotification } from "./ReportDetailsNotification";
import { ReportsLayer } from "./ReportsLayer";
import { StationLayer } from "./StationLayer";

// eslint-disable-next-line @typescript-eslint/no-floating-promises
MapLibreGL.setAccessToken(null);

const MAP_REGION = {
  longitude: 13.40587,
  latitude: 52.51346,
  bounds: {
    ne: [13.88044556529124, 52.77063424239867],
    sw: [12.8364646484805, 52.23115511676795],
  },
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
    alignSelf: "stretch",
  },
});

const LoadingBar = () => (
  <FFBox alignItems="center" justifyContent="space-between" flexDirection="row">
    <Text color="white" fontSize="md">
      Meldungen werden geladen...
    </Text>
    <FFSpinner size={8} />
  </FFBox>
);

export const LinesLayer = () => (
  <ShapeSource id="route-source" shape={lines as GeoJSON.GeoJSON}>
    <LineLayer
      id="route-layer"
      style={{
        lineWidth: 3,
        lineJoin: "round",
        lineCap: "round",
        lineColor: ["get", "color"],
        iconAllowOverlap: true,
        textAllowOverlap: true,
      }}
    />
  </ShapeSource>
);

export const FFMapView = () => {
  const { data: reports, isLoading } = useReports();

  useEffect(() => {
    Geolocation.requestAuthorization(noop, noop);
  }, []);

  const theme = useTheme() as Theme;

  const { bottom, top } = useSafeAreaInsets();

  const topOffset = Platform.OS === "ios" ? top : top + 4;

  const [reportToShow, setReportToShow] = useState<Report | null>(null);

  return (
    <View width="100%" height="100%">
      <MapView
        style={styles.map}
        logoEnabled={false}
        styleURL={config.MAP_STYLE_URL}
        compassViewMargins={{ x: theme.space[4], y: 5 + bottom }}
        compassViewPosition={2}
        attributionEnabled={false}
      >
        <Camera
          defaultSettings={{
            centerCoordinate: [MAP_REGION.longitude, MAP_REGION.latitude],
            zoomLevel: 10,
          }}
          maxBounds={MAP_REGION.bounds}
          minZoomLevel={9}
          maxZoomLevel={13}
          followUserMode={UserTrackingMode.Follow}
        />
        <LinesLayer />
        <StationLayer />
        <ReportsLayer reports={reports ?? []} onPressReport={setReportToShow} />
        <UserLocation visible animated />
      </MapView>
      <Stack position="absolute" top={topOffset} left={2} right={2} space={2}>
        <Attribution />
        {reportToShow !== null && (
          <ReportDetailsNotification
            report={reportToShow}
            onClose={() => setReportToShow(null)}
          />
        )}
        {isLoading && <LoadingBar />}
      </Stack>
    </View>
  );
};

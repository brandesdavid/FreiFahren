import { Link, Row, useTheme, View } from "native-base";
import { Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Theme } from "../../theme";

export const Attribution = () => {
  const theme = useTheme() as Theme;

  const { top } = useSafeAreaInsets();

  const links = [
    {
      text: "MapLibre",
      url: "https://maplibre.org",
    },
    {
      text: "©Jawg",
      url: "https://jawg.io",
    },
    {
      text: "©OpenStreetMap",
      url: "https://openstreetmap.org",
    },
  ];

  return (
    <View position="absolute" top={top} left={4}>
      <Row alignSelf="flex-start" flexDir="row" space={1}>
        {links.map((link) => (
          <Link href={link.url}>
            <Text
              style={{ color: theme.colors.fg, fontSize: 12 }}
              key={link.url}
            >
              {link.text}
            </Text>
          </Link>
        ))}
      </Row>
    </View>
  );
};

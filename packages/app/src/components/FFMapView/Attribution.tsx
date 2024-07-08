import { Link, Row, useTheme } from "native-base";
import { Text } from "react-native";

import { Theme } from "../../theme";

export const Attribution = () => {
  const theme = useTheme() as Theme;

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
    <Row alignSelf="flex-start" flexDir="row" space={1}>
      {links.map((link) => (
        <Link href={link.url} key={link.url}>
          <Text style={{ color: theme.colors.fg, fontSize: 12 }}>
            {link.text}
          </Text>
        </Link>
      ))}
    </Row>
  );
};

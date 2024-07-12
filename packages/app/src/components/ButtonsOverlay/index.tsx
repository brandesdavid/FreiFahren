import { Box, View } from "native-base";

import { ReportButton } from "./ReportButton";
import { ReportListButton } from "./ReportListButton";

export const ButtonsOverlay = () => {
  return (
    <Box
      flex={1}
      position="absolute"
      top={0}
      left={0}
      bottom={0}
      right={0}
      px={4}
      pb={4}
      pointerEvents="box-none"
      justifyContent="flex-end"
      safeArea
    >
      <View
        pointerEvents="box-none"
        flexDir="row"
        justifyContent="space-between"
      >
        <ReportListButton />
        <ReportButton />
      </View>
    </Box>
  );
};

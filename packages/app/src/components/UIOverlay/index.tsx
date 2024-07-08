import { Box, Text } from "native-base";
import { View } from "react-native";

import { useReports } from "../../api";
import { FFBox } from "../common/FFBox";
import { FFSpinner } from "../common/FFSpinner";
import { ReportButton } from "./ReportButton";
import { ReportListButton } from "./ReportListButton";

const LoadingBar = () => (
  <FFBox justifyContent="space-between" alignItems="center" flexDirection="row">
    <Text color="white" fontWeight="bold" fontSize="md">
      Meldungen werden geladen...
    </Text>
    <FFSpinner size={8} />
  </FFBox>
);

export const UIOverlay = () => {
  const { isLoading: isLoadingReports } = useReports();

  return (
    <Box
      flex={1}
      position="absolute"
      top={0}
      left={0}
      bottom={0}
      right={0}
      px={4}
      pt={6}
      pb={8}
      pointerEvents="box-none"
      justifyContent="space-between"
      safeArea
    >
      <View>{isLoadingReports && <LoadingBar />}</View>
      <View pointerEvents="box-none">
        <ReportListButton alignSelf="flex-end" />
        <ReportButton alignSelf="flex-end" mt={2} />
      </View>
    </Box>
  );
};

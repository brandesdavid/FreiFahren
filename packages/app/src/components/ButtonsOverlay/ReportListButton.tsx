import { Entypo } from "@expo/vector-icons";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { Stack, Text, View } from "native-base";
import {
  ComponentProps,
  forwardRef,
  PropsWithChildren,
  Ref,
  useRef,
} from "react";
import { Text as RNText } from "react-native";

import { useReports } from "../../api";
import { FFButton } from "../common/FFButton";
import { FFScrollSheet } from "../common/FFSheet";
import { FFSpinner } from "../common/FFSpinner";
import { ReportItem } from "../common/ReportItem";

export const ReportListSheet = forwardRef(
  (_props: PropsWithChildren<{}>, ref: Ref<BottomSheetModalMethods>) => {
    const { data: reports } = useReports();

    return (
      <FFScrollSheet ref={ref}>
        <Text fontSize="xl" color="white" bold>
          Aktuelle Meldungen
        </Text>
        {reports?.length === 0 ? (
          <Text color="fg">Keine aktuellen Meldungen</Text>
        ) : reports === undefined ? (
          <View flex={1}>
            <FFSpinner />
          </View>
        ) : (
          <View mt={4}>
            <Stack space={5} pb={12}>
              {reports.map((report) => (
                <ReportItem
                  key={`${
                    report.stationId
                  }-${report.timestamp.getMilliseconds()}`}
                  report={report}
                />
              ))}
            </Stack>
          </View>
        )}
      </FFScrollSheet>
    );
  }
);

type ReportListButtonProps = Partial<ComponentProps<typeof FFButton>>;

export const ReportListButton = (props: ReportListButtonProps) => {
  const sheetRef = useRef<BottomSheetModalMethods>(null);

  return (
    <>
      <FFButton
        onPress={() => sheetRef.current?.present()}
        px={5}
        py={3}
        {...props}
      >
        <Entypo name="menu" size={24} color="white" />
        <RNText
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
            marginLeft: 10,
          }}
        >
          Liste
        </RNText>
      </FFButton>
      <ReportListSheet ref={sheetRef} />
    </>
  );
};

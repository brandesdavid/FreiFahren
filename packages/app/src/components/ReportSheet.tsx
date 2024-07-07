import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { Box, Row, Text, useTheme, View } from "native-base";
import {
  forwardRef,
  PropsWithChildren,
  Ref,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { LayoutAnimation } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { useSubmitReport } from "../api/queries";
import { lines, stations } from "../data";
import { Theme } from "../theme";
import { FFButton } from "./common/FFButton";
import { FFCarousellSelect } from "./common/FFCarousellSelect";
import { FFLineTag } from "./common/FFLineTag";
import { FFScrollSheet } from "./common/FFSheet";
import { FFSpinner } from "./common/FFSpinner";

export type ReportSheetMethods = {
  open: () => void;
  close: () => void;
};

export const ReportSheet = forwardRef(
  (_props: PropsWithChildren<{}>, ref: Ref<ReportSheetMethods>) => {
    const { mutateAsync: submitReport, isPending } = useSubmitReport();

    const theme = useTheme() as Theme;

    const sheetRef = useRef<BottomSheetModalMethods>(null);

    useImperativeHandle(ref, () => ({
      open: () => sheetRef.current?.present(),
      close: () => sheetRef.current?.close(),
    }));

    const [lineType, setLineType] = useState<"u" | "s">("u");
    const [selectedLine, setSelectedLine] = useState<string | null>(null);
    const [selectedDirection, setSelectedDirection] = useState<string | null>(
      null
    );
    const [selectedStation, setSelectedStation] = useState<string | null>(null);

    const isValid =
      selectedLine !== null &&
      selectedStation !== null &&
      selectedDirection !== null;

    useEffect(() => setSelectedLine(null), [lineType]);
    useEffect(() => {
      if (selectedLine !== null) {
        sheetRef.current?.expand();
      }
      setSelectedDirection(null);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }, [selectedLine]);
    useEffect(() => setSelectedStation(null), [selectedLine]);

    const lineOptions = useMemo(
      () =>
        Object.keys(lines).filter((line) =>
          line.toLowerCase().startsWith(lineType)
        ),
      [lineType]
    );

    const directionOptions =
      selectedLine === null
        ? []
        : [
            lines[selectedLine][0],
            lines[selectedLine][lines[selectedLine].length - 1],
          ];

    const stationOptions = selectedLine === null ? [] : lines[selectedLine];

    const close = () => {
      sheetRef.current?.close();

      setLineType("u");
      setSelectedLine(null);
    };

    const onSubmit = async () => {
      if (!isValid) return;

      await submitReport({
        line: selectedLine,
        station: stations[selectedStation].name,
        direction: stations[selectedDirection].name,
      });

      close();
    };

    return (
      <FFScrollSheet ref={sheetRef} onDismiss={close}>
        <Box
          justifyContent="space-between"
          overflow="visible"
          position="relative"
          flex={1}
          safeAreaBottom
        >
          <View>
            <Text bold fontSize="xl" mb={4} color="white">
              Kontrolle Melden
            </Text>
            <FFCarousellSelect
              options={["u", "s"]}
              selectedOption={lineType}
              onSelect={setLineType}
              containerProps={{ py: 3, flex: 1 }}
              renderOption={(option) =>
                option === "u" ? (
                  <View borderRadius={8} px={4} py={1} bg="lines.U7">
                    <Text color="white" fontSize="xl" fontWeight="bold">
                      U
                    </Text>
                  </View>
                ) : (
                  <View borderRadius={999} px={3} py={1} bg="lines.S25">
                    <Text color="white" fontSize="xl" fontWeight="bold">
                      S
                    </Text>
                  </View>
                )
              }
            />
            <Text fontSize="md" fontWeight="bold" color="white" mt={4} mb={2}>
              Linie
            </Text>
            <View mx={-4}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: theme.space[5] }}
              >
                <FFCarousellSelect
                  options={lineOptions}
                  selectedOption={selectedLine}
                  onSelect={setSelectedLine}
                  containerProps={{ py: 3, px: 4 }}
                  renderOption={(line) => (
                    <FFLineTag line={line} textProps={{ fontSize: "2xl" }} />
                  )}
                />
              </ScrollView>
            </View>
            {selectedLine !== null && (
              <>
                <Text
                  fontSize="md"
                  fontWeight="bold"
                  color="white"
                  mt={4}
                  mb={2}
                >
                  Richtung
                </Text>
                <FFCarousellSelect
                  vertical
                  options={directionOptions}
                  selectedOption={selectedDirection}
                  onSelect={setSelectedDirection}
                  containerProps={{ py: 3, px: 4 }}
                  renderOption={(direction, isSelected) => (
                    <Row alignSelf="flex-start">
                      <Text color="white" bold={isSelected}>
                        {stations[direction].name}
                      </Text>
                    </Row>
                  )}
                />
                <Text
                  fontSize="md"
                  fontWeight="bold"
                  color="white"
                  mt={4}
                  mb={2}
                >
                  Station
                </Text>
                <FFCarousellSelect
                  vertical
                  collapses
                  options={stationOptions}
                  selectedOption={selectedStation}
                  onSelect={setSelectedStation}
                  containerProps={{ py: 3, px: 4 }}
                  renderOption={(station, isSelected) => (
                    <Row alignSelf="flex-start">
                      <Text color="white" bold={isSelected}>
                        {stations[station].name}
                      </Text>
                    </Row>
                  )}
                />
              </>
            )}
          </View>
          <FFButton
            onPress={onSubmit}
            isDisabled={isPending || !isValid}
            bg="selected"
            alignItems="center"
            mt={8}
          >
            {isPending ? (
              <FFSpinner
                size={6}
                color1="white"
                color2={theme.colors.selected}
              />
            ) : (
              <Text color="white" fontSize="lg" bold mr={6}>
                Melden
              </Text>
            )}
          </FFButton>
        </Box>
      </FFScrollSheet>
    );
  }
);

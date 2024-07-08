import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider, View } from "native-base";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { queryClient } from "./src/api";
import { Main } from "./src/Main";
import { theme } from "./src/theme";

const App = () => {
  return (
    <SafeAreaProvider>
      <NativeBaseProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          {/* eslint-disable-next-line react/style-prop-object */}
          <StatusBar style="light" backgroundColor="transparent" />
          <GestureHandlerRootView style={StyleSheet.absoluteFill}>
            <BottomSheetModalProvider>
              <View flex={1} alignItems="center" justifyContent="center">
                <Main />
              </View>
            </BottomSheetModalProvider>
          </GestureHandlerRootView>
        </QueryClientProvider>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
};

// eslint-disable-next-line import/no-default-export
export default App;

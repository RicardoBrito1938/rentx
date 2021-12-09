import React from "react";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium
} from "@expo-google-fonts/inter";
import {
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold
} from "@expo-google-fonts/archivo";
import AppLoading from "expo-app-loading";
import { Home } from "./src/screens/Home";
import { ThemeProvider } from "styled-components/native";
import theme from "./src/styles/theme";
import { CardDetails } from "./src/screens/CardDetails";
import { Scheduling } from "./src/screens/Scheduling";
import { ScheduleDetails } from "./src/screens/ScheduleDetails";

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <ScheduleDetails />
    </ThemeProvider>
  );
}

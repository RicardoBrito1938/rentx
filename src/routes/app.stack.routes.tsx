import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../screens/Home";
import { CarDetails } from "../screens/CarDetails";
import { Scheduling } from "../screens/Scheduling";
import { ScheduleDetails } from "../screens/ScheduleDetails";
import { Confirmation } from "../screens/Confirmation";
import { MyCars } from "../screens/MyCars";

const { Navigator, Screen } = createNativeStackNavigator();

export const AppStackRoutes = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
      <Screen name="Home" component={Home} />
      <Screen name="CarDetails" component={CarDetails} />
      <Screen name="Scheduling" component={Scheduling} />
      <Screen name="ScheduleDetails" component={ScheduleDetails} />
      <Screen name="Confirmation" component={Confirmation} />
      <Screen name="MyCars" component={MyCars} />
    </Navigator>
  );
};

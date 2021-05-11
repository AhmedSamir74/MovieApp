import React from "react";

import { LoadingScreen, OnBoarding } from "../screens/";
import HomeNavigation from "./HomeNavigation";
import { createStackNavigator } from "@react-navigation/stack";
const MainFlow = createStackNavigator();
const MainNavigation = () => {
  return (
    <MainFlow.Navigator>
      <MainFlow.Screen
        name="Loading"
        component={LoadingScreen}
        options={{ headerShown: false }}
      />
      <MainFlow.Screen
        name="OnBoarding"
        component={OnBoarding}
        options={{ headerShown: false }}
      />
      <MainFlow.Screen
        name="Authorized"
        component={HomeNavigation}
        options={{ headerShown: false }}
      />
    </MainFlow.Navigator>
  );
};

export default MainNavigation;

import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { theme } from "../constants";
import { strings } from "../localization/i18n";
import HomeScreen from "../screens/Home/Home";
import MovieDetails from "../screens/MovieDetails/MovieDetails";
import FavoritesScreen from "../screens/Favorites/Favorites";

const HomeFlow = createStackNavigator();

const HomeNavigation = () => (
  <HomeFlow.Navigator initialRouteName="Home">
    <HomeFlow.Screen
      name="Home"
      component={HomeScreen}
      options={({ navigation }) => {
        return {
          headerTitle: strings("moviesHome"),
          headerStyle: {
            backgroundColor: theme.colors.white,
          },
          headerTitleStyle: {
            fontWeight: "bold",
            color: theme.colors.black,
          },
          headerRight: () => (
            <MaterialCommunityIcons
              name="heart-outline"
              color={theme.colors.green}
              size={26}
              style={{ marginHorizontal: 10 }}
              onPress={() => navigation.navigate("Favorites")}
            />
          ),
        };
      }}
    />
    <HomeFlow.Screen
      name="MovieDetails"
      component={MovieDetails}
      options={{
        headerShown: false,
      }}
    />
    <HomeFlow.Screen
      name="Favorites"
      component={FavoritesScreen}
      options={({ navigation }) => {
        return {
          headerTitle: strings("favorites"),
          headerStyle: {
            backgroundColor: theme.colors.white,
          },
          headerTitleStyle: {
            fontWeight: "bold",
            color: theme.colors.black,
          },
          headerLeft: () => (
            <MaterialCommunityIcons
              name="chevron-left"
              color={theme.colors.black}
              size={35}
              style={{ paddingHorizontal: 10 }}
              onPress={() => navigation.goBack()}
            />
          ),
          headerRight: () => <View />,
        };
      }}
    />
  </HomeFlow.Navigator>
);

export default HomeNavigation;

import React, { useEffect } from "react";
import { View, Text, ImageBackground } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { Button } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { theme } from "../../constants";
import { WELCOME_SLIDER_DATA } from "../../constants/welcome-slider-data";
import i18n from "../../localization";
import { setNewUser } from "../../services/controllers";
import styles from "./style";

export const OnBoarding = ({ navigation }: any) => {
  useEffect(() => {
    setNewUser(false);
  }, []);
  const renderItem = ({ item }: any) => {
    return (
      <View style={styles.screen}>
        <ImageBackground
          style={[
            styles.image,
            item.key === "2" ? { justifyContent: "flex-start" } : {},
          ]}
          source={item.image}
        >
          <Text style={styles.imageTitle}>{item.title}</Text>
          <Text style={styles.imageText}>{item.text}</Text>
        </ImageBackground>
      </View>
    );
  };

  const onDone = () => {
    navigation.navigate("Authorized");
  };

  const renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <MaterialCommunityIcons
          name="chevron-right"
          color={theme.colors.primary}
          size={26}
        />
      </View>
    );
  };

  const renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <MaterialCommunityIcons
          name="home"
          color={theme.colors.primary}
          size={26}
        />
      </View>
    );
  };

  const renderSkipBtn = () => {
    return (
      <Button
        style={styles.getStartBtn}
        labelStyle={styles.getStartLabel}
        mode="contained"
        onPress={onDone}
      >
        {i18n.t("getStarted")}
      </Button>
    );
  };

  return (
    // SafeAreaView Used To Fix Design In Notch Screen Phones
    <View style={styles.screen}>
      <AppIntroSlider
        renderItem={renderItem}
        data={WELCOME_SLIDER_DATA}
        onDone={onDone}
        renderDoneButton={renderDoneButton}
        renderNextButton={renderNextButton}
        showSkipButton
        renderSkipButton={renderSkipBtn}
      />
    </View>
  );
};

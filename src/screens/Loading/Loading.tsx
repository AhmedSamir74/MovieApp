import React, { useEffect } from "react";
import { View, Image } from "react-native";
import styles from "./style";
import { isNewUser } from "../../services/controllers";

export const LoadingScreen = (props: any) => {
  const newUserHelper = async () => {
    const returnedNewUser = await isNewUser();
    if (returnedNewUser) {
      props.navigation.replace("OnBoarding");
    } else {
      props.navigation.replace("Authorized");
    }
  };
  useEffect(() => {
    newUserHelper();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/logo.png")} style={styles.img} />
    </View>
  );
};

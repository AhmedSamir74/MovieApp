import React from "react";
import { View, TouchableOpacity } from "react-native";
import styles from "./style";

export const Card = ({
  disabled,
  children,
  onPress,
  style,
}: {
  disabled?: boolean | undefined;
  children?: any;
  onPress?: any;
  style?: any;
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.cardCont, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.cardInner}>{children}</View>
    </TouchableOpacity>
  );
};

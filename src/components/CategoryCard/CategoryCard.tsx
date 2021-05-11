import React from "react";
import { Pressable, Text } from "react-native";
import { ICategory } from "../../models";
import { styles } from "./style";

export const CategoryCard = ({
  item: category,
  activeCategory,
  onCategoryPress,
}: {
  item: ICategory;
  activeCategory: number;
  onCategoryPress: any;
}) => {
  return (
    <Pressable
      style={[
        styles.categoryCont,
        activeCategory == category.key ? styles.activeCategoryCont : null,
      ]}
      onPress={onCategoryPress}
    >
      <Text
        style={[
          styles.title,
          activeCategory == category.key ? styles.activeTitle : null,
        ]}
      >
        {category.title}
      </Text>
    </Pressable>
  );
};

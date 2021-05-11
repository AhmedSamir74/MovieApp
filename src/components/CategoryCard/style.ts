import { StyleSheet } from "react-native";
import { theme } from "../../constants";

export const styles = StyleSheet.create({
  categoryCont: {
    marginHorizontal: 5,
    marginVertical: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: theme.colors.veryLightGrey,
    borderRadius: 15,
    justifyContent: "center",
    height: 30,
  },
  activeCategoryCont: {
    backgroundColor: theme.colors.green,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  title: {
    fontSize: 12,
    color: theme.colors.black,
    fontWeight: "bold",
  },
  activeTitle: {
    color: theme.colors.white,
  },
});

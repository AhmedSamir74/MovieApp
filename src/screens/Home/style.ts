import { StyleSheet } from "react-native";
import { theme } from "../../constants";
export const styles = StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  activityIndicatorCont: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  footerCont: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  listCont: {
    flex: 1,
  },
  categoryList: {
    marginTop: 5,
    marginBottom: 10,
  },
});

import { StyleSheet } from "react-native";
import { theme } from "../../../constants";

export default StyleSheet.create({
  cardCont: {
    backgroundColor: theme.colors.white,
    borderRadius: 15,
    borderColor: "#000",
    padding: 3,
    marginHorizontal: 10,
    marginVertical: 5,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  cardInner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
});

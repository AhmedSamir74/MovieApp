import { StyleSheet } from "react-native";

import { theme } from "../../constants";

export default StyleSheet.create({
  screen: {
    flex: 1,
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: theme.colors.lightGrey,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    paddingVertical: "25%",
    alignItems: "center",
  },
  imageTitle: {
    fontSize: 17,
    color: theme.colors.white,
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 5,
  },
  imageText: {
    color: theme.colors.white,
    fontSize: 15,
    textAlign: "center",
    lineHeight: 30,
    marginHorizontal: 5,
  },
  pagination: {
    width: 10,
    backgroundColor: theme.colors.white,
    height: 10,
  },
  paginationCont: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  getStartBtn: {
    borderRadius: 10,
  },
  getStartLabel: {
    color: theme.colors.white,
  },
});

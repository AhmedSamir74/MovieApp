import { StyleSheet } from "react-native";

import { theme } from "../../constants";

export const styles = StyleSheet.create({
  cardCont: {
    width: "100%",
    flexDirection: "row",
    paddingStart: 5,
    paddingEnd: 10,
    marginVertical: 5,
  },
  cardImg: {
    width: 75,
    height: 95,
    borderRadius: 5,
  },
  textCont: {
    flex: 1,
    paddingLeft: 15,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    color: theme.colors.darkGrey,
    marginEnd: 10,
  },
  date: {
    fontSize: 12,
    color: theme.colors.lightGrey,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  vote: {
    fontSize: 14,
    fontWeight: "bold",
    color: theme.colors.green,
    paddingStart: 10,
    borderRadius: 15,
  },
  genresCont: {
    flexDirection: "row",
  },
  genres: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    fontSize: 11,
    color: theme.colors.darkGrey,
    borderRadius: 15,
    marginEnd: 5,
    backgroundColor: theme.colors.veryLightGrey,
  },
  favCont: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

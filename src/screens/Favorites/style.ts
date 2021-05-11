import { StyleSheet } from "react-native";
import { theme } from "../../constants";
export const styles = StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  searchBar: {
    backgroundColor: theme.colors.white,
    marginVertical: 15,
    marginHorizontal: 10,
  },
  searchBarInput: {
    color: theme.colors.lightGrey,
  },
  emptyListCont: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyImage: {
    marginBottom: 20,
    width: 130,
  },
  emptyListTitle: {
    fontSize: 20,
    color: theme.colors.white,
    marginBottom: 30,
  },
  addLabelStyle: {
    color: theme.colors.white,
    fontSize: 16,
  },
  addBtn: {
    backgroundColor: theme.colors.green,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

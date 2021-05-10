import { StyleSheet } from "react-native";

export default StyleSheet.create({
  checkMark: {
    width: 18,
    height: 18,
    alignSelf: "center",
  },
  toastCont: {
    position: "absolute",
    left: 50,
    right: 50,
    height: 50,
    zIndex: 9999,
  },
  toastText: {
    color: "#fff",
    fontSize: 13,
    marginHorizontal: 5,
    textAlignVertical: "center",
    alignSelf: "center",
  },
  touchableOpacity: {
    marginEnd: 5,
    backgroundColor: "#486581",
    borderRadius: 16,
    paddingVertical: 25,
    paddingHorizontal: 19,
    alignItems: "center",
    justifyContent: "center",
  },
});

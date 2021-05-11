import { StyleSheet } from "react-native";
import { SCREEN_WIDTH, theme } from "../../constants";
export const styles = StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  loaderCont: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    flex: 1,
  },
  imgCont: {
    height: 250,
    width: SCREEN_WIDTH,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    overflow: "hidden",
  },
  backIcon: {
    position: "absolute",
    top: 40,
    left: 0,
    width: 70,
    height: 40,
    zIndex: 111,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    borderTopEndRadius: 20,
    borderBottomEndRadius: 20,
    opacity: 0.7,
  },
  favIcon: {
    right: 0,
    left: undefined,
    borderTopStartRadius: 20,
    borderBottomStartRadius: 20,
    borderTopEndRadius: 0,
    borderBottomEndRadius: 0,
  },
  characterImg: {
    flex: 1,
  },
  infoCont: {
    flex: 1,
    paddingHorizontal: 10,
  },
  characterName: {
    fontSize: 22,
    color: theme.colors.black,
    fontWeight: "bold",
    marginTop: 15,
    textAlign: "center",
  },
  vote: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.colors.green,
    textAlign: "center",
    marginTop: 5,
    marginBottom: 15,
  },
  sectionCont: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    color: theme.colors.black,
    fontWeight: "bold",
    marginBottom: 3,
  },
  sectionDesc: {
    fontSize: 13,
    color: theme.colors.darkGrey,
    textAlign: "left",
  },
  genresCont: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  genres: {
    fontSize: 12,
    fontWeight: "bold",
    color: theme.colors.black,
    textAlign: "left",
    borderRadius: 15,
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginEnd: 5,
    marginBottom: 5,
    backgroundColor: theme.colors.veryLightGrey,
  },
  creditImg: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
  },
  creditName: {
    marginBottom: 7,
    marginHorizontal: 3,
    textAlign: "center",
  },
  creditCont: {
    width: 100,
    justifyContent: "space-between",
    alignItems: "center",
  },

  //ANIMATED TOAST
  checkMark: {
    width: 18,
    height: 18,
    alignSelf: "center",
  },
  toastCont: {
    position: "absolute",
    top: 15,
    zIndex: 1111,
    left: 10,
    right: 10,
    height: 55,
  },
  toastText: {
    color: "#fff",
    fontSize: 16,
    marginHorizontal: 10,
    textAlignVertical: "center",
    alignSelf: "center",
    textTransform: "uppercase",
  },
  touchableOpacity: {
    marginEnd: 5,
    backgroundColor: "#486581",
    borderRadius: 16,
    paddingVertical: 25,
    paddingHorizontal: 19,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  toastImageCont: {
    flex: 1,
    flexDirection: "row",
  },
});

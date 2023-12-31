import { StyleSheet, Dimensions } from "react-native";
import { Themes } from "./assets/Themes";

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },

  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 24,
  },

  searchBar: {
    height: 40,
    width: windowWidth * 0.9,
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
    backgroundColor: Themes.colors.containers,
  },
  userList: {
    width: windowWidth,
    padding: 15,
  },
  searchListCard: {
    backgroundColor: "black",
    justifyContent: "center",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  searchListCardText: {
    color: "white",
  },
  exploreCard: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
    width: windowWidth * 0.9,
    height: windowWidth * 0.6,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    flexDirection: "row",
    backgroundColor: Themes.colors.buttons,
    padding: 5,
    borderRadius: 20,
    marginHorizontal: 5,
    width: windowWidth * 0.25,
    justifyContent: "center",
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  about: {
    fontSize: 18,
    marginVertical: 8,
    color: Themes.colors.textSecondary,
  },
  profilePic: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  initials: {
    fontSize: 24,
    color: "#333",
  },
  description: {
    textAlign: "center",
    marginBottom: 20,
    color: Themes.colors.textSecondary,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 10,
    backgroundColor: Themes.colors.containers,
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: windowWidth * 0.8,
  },
  modalHeader: {
    width: "100%",
    alignItems: "flex-end",
  },
  modalText: {
    margin: 30,
    fontSize: 20,
    color: "white",
  },
});

export default styles;

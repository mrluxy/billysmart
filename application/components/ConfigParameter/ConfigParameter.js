import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
  // -------------- Style General  --------------
  button: {
    backgroundColor: Colors.darkerColor,
    color: Colors.lighterColor,
    shadowColor: "transparent"
  },

  texteWhite: {
    color: Colors.whiteColor
  },

  flex: {
    flex: 1
  },

  input: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.darkerColor,
    backgroundColor: "transparent",
    marginHorizontal: 10,
    paddingHorizontal: 5,
    height: 50,
    color: "red", //colors.darkGreen
  },

  // -------------- Config cat  --------------

  card: {
    flex: 1,
    backgroundColor: Colors.darkColor,
    paddingVertical: 20,
    margin: 15,
    padding: 10
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 25,
    maxHeight: 470
  },

  row: {
    flex: 1,
    flexDirection: "row"
  },

  column: {
    flex: 1,
    flexDirection: "column",
    margin: 5
  },

  configCat: {
    height: 150,
    width: 150,
    backgroundColor: Colors.darkColor,
  },

  configBilly: {
    height: 150,
    width: 150,
    marginTop: 10,
    backgroundColor: Colors.darkColor,
  },

  parameter: {
    height: 310,
    width: 150,
    backgroundColor: Colors.darkColor,
  },

  profile: {
    height: 150,
    width: 310,
    backgroundColor: Colors.darkColor,
  },

  table: {
    borderWidth: 0.5,
    borderColor: Colors.whiteColor,
    flexDirection: "column"
  },

  row: {
    flexDirection: "row"
  },

  cellule: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: Colors.whiteColor,
    borderWidth: 0.5,
    borderColor: Colors.whiteColor,
    color: Colors.whiteColor,
    justifyContent: "center",
    alignItems: "center",
    height: 40
  },

  cardInfo: {
    marginVertical: 20,
    padding: 20,
    backgroundColor: Colors.lighterColor,
    height: 150
  }
});

export default class Parameter extends React.Component {

    render() {
        return(
            <View>
                <TouchableHighlight onPress={() => this.props.returnHome(null)}>
                    <Text> Home </Text>
                </TouchableHighlight>
                <Text> parameter </Text>
            </View>
        );
    }
}

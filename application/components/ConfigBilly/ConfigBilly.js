import React from "react";
import { StyleSheet, Text, View, Button, TouchableHighlight, Image, TextInput } from "react-native";
import Colors from "../../constants/Colors";
import Reservoir from '../Reservoir/Reservoir';

const mock = {
  reservoir: 150
}

const styles = StyleSheet.create({
  // -------------- Style General  --------------
  button: {
    flex: 1,
    backgroundColor: Colors.darkerColor,
    color: Colors.lighterColor,
    shadowColor: "transparent",
    marginTop: 15,
  },

  texteWhite: {
    color: Colors.whiteColor
  },

  flex: {
    flex: 1
  },

  input: {
    borderBottomWidth: 2,
    borderBottomColor: 'white',
    backgroundColor: "transparent",
    marginHorizontal: 10,
    paddingHorizontal: 5,
    color: "white", //colors.darkGreen
  },

  picker: {
    color: 'lightgrey',
    paddingHorizontal: 0,
  },

  // -------------- Config cat  --------------

  card: {
    flex: 1,
    // backgroundColor: Colors.darkColor,
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
    backgroundColor: Colors.defaultColor,
    borderWidth: 2,
    borderColor: 'white',
    height: 150,
    justifyContent: 'center',
  }
});

export default class ConfigBilly extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dose: '45',
      frequence: '3',
    };
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.card}>
          <View>
            <TouchableHighlight onPress={() => this.props.returnHome(null)}>
              <Image source={require("../../assets/images/back.png")} style={{ margin:5, height: 24 }}/>
            </TouchableHighlight>
            <Text style={[styles.texteWhite]}>Configuration Billy</Text>
          </View>

          {/* <View style={styles.table}>
            <View style={styles.row}>
              <Text style={styles.cellule}>Lun.</Text>
              <Text style={styles.cellule}>Mar.</Text>
              <Text style={styles.cellule}>Mer.</Text>
              <Text style={styles.cellule}>Jeu.</Text>
              <Text style={styles.cellule}>Ven.</Text>
              <Text style={styles.cellule}>Sam.</Text>
              <Text style={styles.cellule}>Dim.</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.cellule}>Test</Text>
              <Text style={styles.cellule}>Test</Text>
              <Text style={styles.cellule}>Test</Text>
              <Text style={styles.cellule}>Test</Text>
              <Text style={styles.cellule}>Test</Text>
              <Text style={styles.cellule}>Test</Text>
              <Text style={styles.cellule}>Test</Text>
            </View>
          </View> */}

          <View style={styles.cardInfo}>
            <Text style={styles.texteWhite}>Dose:</Text>
            <TextInput
              style={[styles.flex, styles.input]}
              placeholder="Dose"
              value={this.state.dose}
              keyboardType={"number-pad"}
              onChange={(text) => this.setState({dose:text})}
            />
            <Text style={{ marginTop: 15, color: 'white'}}>fréquance:</Text>
            <TextInput
              style={[styles.flex, styles.input]}
              value={this.state.frequence}
              onChange={(text) => this.setState({frequence:text})}
              placeholder="Frequence"
              keyboardType={"numeric"}
            />
            {/* <Button title="Save" style={styles.button}/> */}
          </View>

          <View style={{ flex: 1 }}>
            <Button
              style={styles.button}
              title="validay"
              onPress={() => {
                this.setModalVisible(true);
              }}
            />
          </View>

          <Reservoir data={mock.reservoir} />
        </View>
      </View>
    );
  }
}

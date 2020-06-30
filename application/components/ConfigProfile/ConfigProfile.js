import React from "react";
import { StyleSheet,  Text, View, TextInput, Button, TouchableHighlight, Image } from "react-native";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
  // -------------- Style General  --------------
  button: {
    backgroundColor: 'red',
    flex: 1,
    marginTop: 20,
    color: 'yellow',
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
    borderBottomColor: 'white',
    color: 'white',
    backgroundColor: "transparent",
    marginHorizontal: 10,
    paddingHorizontal: 5,
    height: 50,
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
    backgroundColor: Colors.lighterColor,
    height: 150
  }
});

/* TODO: enlever le mot de passe pour la modif ! */
export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Prénom",
      lastname: "Nom",
      mail: "mail",
      password: "mot de passe"
    };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.card}>
          <View>
            <TouchableHighlight onPress={() => this.props.returnHome(null)}>
              <Image source={require("../../assets/images/back.png")} style={{ margin:5, height: 24 }}/>
            </TouchableHighlight>
            <Text style={[styles.texteWhite]}>Profile</Text>
          </View>
          {/* ------------------- Row 1 ------------------- */}
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TextInput
              style={[styles.flex, styles.input]}
              placeholder="name"
              value={this.state.name}
              onChangeText={text => this.setState({ name: text })}
            />
            <TextInput
              style={[styles.flex, styles.input]}
              placeholder="lastName"
              value={this.state.lastname}
              onChangeText={text => this.setState({ lastname: text })}
            />
          </View>

          {/* ------------------- Row 4 ------------------- */}

          <TextInput
            style={[styles.input]}
            placeholder="mail"
            keyboardType={"email-address"}
            value={this.state.mail}
            onChangeText={text => this.setState({ mail: text })}
          />

          {/* ------------------- Row 5 ------------------- */}
          <TextInput
            value={this.state.password}
            style={[styles.input]}
            onChange={(text) => this.setState({password:text})}
            placeholder="password"
          />

          {/* ------------------- Row 6 ------------------- */}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <View style={styles.button}>
              <Button title="validay" />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Picker,
  Modal,
  Image
} from "react-native";
import Colors from "../../constants/Colors";
import { config } from "../../constants/config";
import {
  storeData,
  retrieveData
} from "../../components/LocalStorageBilly/LocalStorageBilly";

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
    borderBottomColor: "white",
    backgroundColor: "transparent",
    marginHorizontal: 10,
    paddingHorizontal: 5,
    height: 50,
    color: "lightgrey" //colors.darkGreen
  },

  card: {
    flex: 1,
    // backgroundColor: Colors.darkColor,
    paddingVertical: 20,
    margin: 15,
    padding: 10
  },

  picker: {
    color: "lightgrey",
    paddingHorizontal: 0
  },

  // -------------- Config cat  --------------

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
    backgroundColor: Colors.darkColor
  },

  configBilly: {
    height: 150,
    width: 150,
    marginTop: 10,
    backgroundColor: Colors.darkColor
  },

  parameter: {
    height: 310,
    width: 150,
    backgroundColor: Colors.darkColor
  },

  profile: {
    height: 150,
    width: 310,
    backgroundColor: Colors.darkColor
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

export default class ConfigCate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false
    };
  }

  componentDidMount() {
    this.getData();
  }

  // Todo : faire un get data
  getData = async () => {
    try {
      const gamelle = await retrieveData("gamelle");
      const animal = await retrieveData("animal");
      console.log("data ==> ", animal);

      await this.setState({
        idAnimal: animal.id,
        idGamelle: gamelle.id,
        name: animal.nom,
        pet: animal.race,
        genre: "male",
        race: "labrador",
        age: animal.age.toString(),
        objpoid: animal.objpoid.toString(),
        newWeight: "",
        modalVisible: false,
        date: "20/07/1999",
        typeregime: animal.typeregime
      });

      if (this.state.name === animal.nom) {
        this.setState({ isLoaded: true });
      }
    } catch (err) {
      console.log("error ===> ", err);
    }
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  update = async () => {
    try {
      const date = new Date();
      const res = await fetch(
        `${config.urlApi}/poids?id_animal=${this.state.idAnimal.toString()}`,
        {
          method: "POST",
          headers: config.headers,
          body: JSON.stringify({ kg: parseInt(this.state.newWeight), date })
        }
      );
      const result = await res.json();
      if (result) {
        storeData("newWeight", { isNewWeight: true });
      }
    } catch (error) {
      console.log("error");
    }
  };

  updatePet = async () => {
    try {
      const res = await fetch(
        `${config.urlApi}/animal?id_animal=${this.state.idAnimal.toString()}`,
        {
          method: "PUT",
          headers: config.headers,
          body: JSON.stringify({
            nom: this.state.name,
            race: this.state.pet,
            age: parseInt(this.state.age),
            photo:
              "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/video/caring_for_your_kitten_video/650x350_caring_for_your_kitten_video.jpg",
            objpoid: parseInt(this.state.objpoid),
            typeregime: this.state.typeregime,
          })
        }
      );
      const result = await res.json();
      if (result) {
        storeData("animal", {
          id: this.state.idAnimal,
          nom: this.state.name,
          race: this.state.pet,
          age: parseInt(this.state.age),
          photo:
            "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/video/caring_for_your_kitten_video/650x350_caring_for_your_kitten_video.jpg",
          objpoid: parseInt(this.state.objpoid),
          typeregime: this.state.typeregime,
          id_gamelle: this.state.idGamelle
        });
      }
    } catch (error) {
      console.log("error update pet", error);
    }
  };

  render() {
    return (
      <>
        {this.state.isLoaded && (
          <View style={{ flex: 1 }}>
            <View style={styles.card}>
              <View>
                <TouchableHighlight onPress={() => this.props.returnHome(null)}>
                  <Image
                    source={require("../../assets/images/back.png")}
                    style={{ margin: 5, height: 24 }}
                  />
                </TouchableHighlight>
              </View>
              {/* ------------------- Row 1 ------------------- */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <TextInput
                  style={[styles.flex, styles.input]}
                  placeholder="name"
                  value={this.state.name}
                  onChangeText={text => this.setState({ name: text })}
                />
                <View style={[styles.flex, styles.input]}>
                  <Picker
                    style={styles.picker}
                    selectedValue={this.state.pet}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({ pet: itemValue })
                    }
                  >
                    <Picker.Item label="Chat" value="cat" />
                    <Picker.Item label="Chien" value="dog" />
                  </Picker>
                </View>
              </View>
              {/* ------------------- Row 2 ------------------- */}
              <View style={{ flexDirection: "row" }}>
                <View style={[styles.flex, styles.input]}>
                  <Picker
                    style={styles.picker}
                    selectedValue={this.state.genre}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({ genre: itemValue })
                    }
                  >
                    <Picker.Item label="Mâle" value="male" />
                    <Picker.Item label="Femelle" value="femelle" />
                  </Picker>
                </View>
                <View style={[styles.flex, styles.input]}>
                  <Picker
                    style={styles.picker}
                    selectedValue={this.state.race}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({ race: itemValue })
                    }
                  >
                    <Picker.Item label="Labrador" value="labrador" />
                    <Picker.Item label="Pixie-bob" value="PixieBob" />
                  </Picker>
                </View>
              </View>
              {/* ------------------- Row 3 ------------------- */}

              <View style={{ flexDirection: "row" }}>
                <TextInput
                  value={this.state.age}
                  style={[styles.flex, styles.input]}
                  placeholder="Age"
                  keyboardType={"numeric"}
                  onChangeText={text => this.setState({ age: text })}
                />
                <TextInput
                  value={this.state.typeregime}
                  style={[styles.flex, styles.input]}
                  placeholder="Type de Regime"
                  onChangeText={text => this.setState({ typeregime: text })}
                />
              </View>
              {/* ------------------- Row 4 ------------------- */}

              <TextInput
                value={this.state.objpoid}
                style={[styles.input]}
                placeholder="poid visée"
                keyboardType={"numeric"}
                onChangeText={text => this.setState({ objpoid: text })}
              />

              {/* ------------------- Row 5 ------------------- */}
              <View style={{ marginVertical: 15, padding: 20 }}>
                <Button
                  style={[styles.button]}
                  title="validay"
                  onPress={() => {
                    this.updatePet();
                  }}
                />
              </View>

              {/* ------------------- Row 6 ------------------- */}

              <View
                style={{
                  padding: 20,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <View style={{ flex: 1 }}>
                  <Button
                    style={[styles.button]}
                    title="peser le chat"
                    onPress={() => {
                      this.setModalVisible(true);
                    }}
                  />
                </View>
              </View>
            </View>

            {/* ------------------- Modal  ------------------- */}

            <Modal
              animationType="fade"
              transparent={true}
              visible={this.state.modalVisible}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <View
                  style={{
                    width: 295,
                    height: 320,
                    padding: 20,
                    backgroundColor: "green"
                  }}
                >
                  <TouchableHighlight
                    onPress={() => {
                      this.setModalVisible(!this.state.modalVisible);
                    }}
                  >
                    <Image
                      source={require("../../assets/images/back.png")}
                      style={{ margin: 5, height: 24 }}
                    />
                  </TouchableHighlight>
                  <TextInput
                    onChangeText={text => this.setState({ newWeight: text })}
                    style={[styles.input]}
                    placeholder="nouveau poid (en kg)"
                    keyboardType={"numeric"}
                  />
                  <View style={{ marginVertical: 15, padding: 20 }}>
                    <Button
                      style={[styles.button]}
                      title="validay"
                      onPress={() => {
                        this.update();
                      }}
                    />
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        )}
      </>
    );
  }
}

import React from "react";
import { StyleSheet, Text, View, TouchableHighlight, ImageBackground } from "react-native";
import Header from "../components/Header/Header";
import ConfigPet from "../components/ConfigPet/ConfigPet";
import ConfigBilly from "../components/ConfigBilly/ConfigBilly";
import ConfigParameter from "../components/ConfigParameter/ConfigParameter";
import ConfigProfile from "../components/ConfigProfile/ConfigProfile";
import Colors from "../constants/Colors";
import { retrieveData } from '../components/LocalStorageBilly/LocalStorageBilly';
import { w3cwebsocket as W3CWebSocket } from "websocket";

const mock = {
  petPicture: 'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/video/caring_for_your_kitten_video/650x350_caring_for_your_kitten_video.jpg',
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  body: {
    flex: 8,
    marginHorizontal: 20
  },
  bg: {
    width: '100%',
    height: '100%',
    borderRadius: 5
  },
  text: {
    fontFamily: 'amiko-regular',
    fontSize: 18,
    padding: 4,
    color: Colors.darkerColor,
  },

  btn: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: '100%',
    width: '100%',
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 25,
    maxHeight: 470
  },
  buttonsContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    marginVertical: 30
  },
  topButtons: {
    flex: 2,
    flexDirection: 'row',
    width: '100%'
  },
  topLeftBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    marginRight: 5
  },
  topLeftBg: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 126,
    width: 126,
    marginBottom: 10
  },
  topRightBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    marginLeft: 5
  },
  topRightBg: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 260,
    width: 131,
    marginBottom: 10,
  },
  bottomButtons: {
    flex: 1,
    width: '100%'
  },
  bottomBg: {
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  }
});

const reader = new W3CWebSocket("ws://192.168.1.114:8765/broadcast/read");
const writer = new W3CWebSocket("ws://192.168.1.114:8765/broadcast/write");

export default class ConfigScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: null,
      isLoaded: false
    };
  }

  componentDidMount() {
    this.getName();
    this.setState({ isLoaded: true });

    reader.onopen = () => {
      console.log('WebSocket Client reader Connected');
    };

    reader.onmessage = (message) => {
      console.log('READER ON MESSAGE')
    }

    writer.onopen = () => {
      console.log('WebSocket Client writer Connected');
    };

    writer.onmessage = (message) => {
      console.log('WRITER ON MESSAGE')
    }
  }

  componentDidUpdate(prevState) {
    this.getLocalStorage(prevState);
  }

  getLocalStorage = async (prevState) => {
    const animal = await retrieveData('animal');
    if (prevState && prevState.petName !== animal.nom) {
      this.setState({ petName: animal.nom });
    }
  }

  getName = async () => {
    const animal = await retrieveData('animal');
    this.setState({ petName: animal.nom });
  }

  updatePage = (value) => {
    this.setState({ page: value });
  }

  sendFood = () => {
    console.log('coucou');
    writer.send('verser');
  }

  renderContent = (page) => {
    switch (page) {
      case 'configPet':
        return <ConfigPet returnHome={value => this.updatePage(value)} />;

      case 'configBilly':
        return <ConfigBilly returnHome={value => this.updatePage(value)} />;

      case 'configProfile':
        return <ConfigProfile returnHome={value => this.updatePage(value)} />;

      case 'configParameter':
        return <ConfigParameter returnHome={value => this.updatePage(value)} />;

      default:
        return (
          <View style={styles.center}>
            <View style={styles.buttonsContainer}>
              <View style={styles.topButtons}>
                <View style={styles.topLeftBtn}>
                  {/* -------------------- Mon animal -------------------- */}
                  <ImageBackground source={require('./images/cat2.png')} style={styles.bottomBg, styles.topLeftBg}>
                    <TouchableHighlight style={styles.btn} onPress={() => this.setState({ page: "configPet" })}>
                      <Text style={styles.text}>Mon animal</Text>
                    </TouchableHighlight>
                  </ImageBackground>
                  {/* -------------------- Ma gamelle -------------------- */}
                  <ImageBackground source={require('./images/billy2.png')} style={styles.bottomBg, styles.topLeftBg}>
                    <TouchableHighlight style={styles.btn} onPress={() => this.setState({ page: "configBilly" })}>
                      <Text style={styles.text}>Ma gamelle</Text>
                    </TouchableHighlight>
                  </ImageBackground>
                </View>
                {/* -------------------- food -------------------- */}
                <View style={styles.topRightBtn}>
                  <ImageBackground source={require('./images/food2.png')} style={styles.topRightBg}>
                    <TouchableHighlight style={styles.btn} onPress={() => this.sendFood()}>
                      <Text style={styles.text}></Text>
                    </TouchableHighlight>
                  </ImageBackground>
                </View>

              </View>
              <View style={styles.bottomButtons}>
                {/* -------------------- Profile -------------------- */}
                <ImageBackground source={require('./images/profile2.png')} style={styles.bottomBg}>
                  <TouchableHighlight style={styles.btn} onPress={() => this.setState({ page: "configProfile" })}>
                    <Text style={styles.text}>Profil</Text>
                  </TouchableHighlight>
                </ImageBackground>
              </View>
            </View>
          </View>
        );
    }
  }

  render() {
    const { page, isLoaded, petName } = this.state;

    return (
      <>
        {isLoaded &&
          <View style={styles.root}>
            <Header name={petName} picture={mock.petPicture} />
            <View style={styles.body}>
              <ImageBackground source={require('../assets/images/bg.png')} style={styles.bg}>
                {this.renderContent(page)}
              </ImageBackground>
            </View>
          </View>}
      </>
    );
  }
}

ConfigScreen.navigationOptions = { header: null };
import React, { Component } from 'react';
import { View, Alert, StyleSheet, ImageBackground, Text, ActivityIndicator } from 'react-native';
import Graph from '../components/Graph/Graph';
import Header from '../components/Header/Header';
import ButtonStats from '../components/ButtonStats/ButtonStats';
import { config } from '../constants/config';
import { retrieveData, storeData } from '../components/LocalStorageBilly/LocalStorageBilly';
import Colors from '../constants/Colors';

const mock = {
  petPicture: 'https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/video/caring_for_your_kitten_video/650x350_caring_for_your_kitten_video.jpg'
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
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20
  },
  graphContainer: {
    flex: 4,
    justifyContent: 'space-around'
  },
  img: {
    width: 70,
    height: 70
  },
  text: {
    color: Colors.whiteColor,
    fontSize: 30,
    textAlign: 'center'
  }
});

export default class StatsScreen extends Component {
  constructor(props) {
    super(props);


    this.state = {
      screen: 'gamelle',
      dataLineChar: {},
      isLoaded: false,
      petName: ''
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    console.log('***************');
    const animal = await retrieveData('animal');
    const graphWeight = await retrieveData('graphWeight');
    const gamelle = await retrieveData('gamelle');

      try {
        console.log('===> REQUEST STATS SCREEN');
        const res = await fetch(`${config.urlApi}/historique?id_gamelle=${gamelle.id}`, {
          method: 'GET',
          headers: config.headers
        });
        const result = await res.json();
        console.log(result);
        storeData('statsScreen', result);

        if (result) {
          await this.convertDataToGraph(result, graphWeight, animal);

          const gamelle = await retrieveData('graphGamelle');
          const nourriture = await retrieveData('graphNourriture');

          if (gamelle && nourriture) {
            this.setState({ isLoaded: true });
          }
        }
      } catch (err) {
        console.log(err);
      }
  }

  convertDataToGraph = async (result, graphWeight, animal) => {
    const labelDose = [];
    const dataDose = [];
    const labelManger = [];
    const dataManger = [];

    for (let i = 4; i >= 0; i--) {
      const dateDose = new Date(result.resultDose[i].date);
      const timeDose = `${dateDose.getDate() > 10 ? dateDose.getDate() : `0${dateDose.getDate()}`}/0${dateDose.getMonth() + 1}`;
      labelDose.push(timeDose);
      dataDose.push(result.resultDose[i].nb);
      const dateManger = new Date(result.resultManger[i].date);
      const timeManger = `${dateManger.getDate() > 10 ? dateManger.getDate() : `0${dateManger.getDate()}`}/0${dateManger.getMonth() + 1}`;
      labelManger.push(timeManger);
      dataManger.push(result.resultManger[i].nb);
    }

    const graphBalance = { graphData: graphWeight, yAxisSuffix: ' kg' };
    const graphGamelle = { graphData: { labels: labelManger, datasets: [{ data: dataManger }] }, yAxisSuffix: ' fois' };
    const graphNourriture = { graphData: { labels: labelDose, datasets: [{ data: dataDose }] }, yAxisSuffix: ' g' };
    const data = { balance: graphBalance, gamelle: graphGamelle, nourriture: graphNourriture };

    this.setState({
      data,
      petName: animal.nom,
      dataLineChar: graphGamelle
    });

    storeData('graphGamelle', graphGamelle);
    storeData('graphNourriture', graphNourriture);
  }

  onPressButton = (value) => {
    console.log('===> ACTIVE-DATA', this.state.data[value])
    this.setState({
      screen: value,
      dataLineChar: this.state.data[value]
    });
  }

  render() {


  }

  render() {
    const { screen, dataLineChar, isLoaded, petName } = this.state;

    if (!this.state.isLoaded) {
      return (
        <View style={styles.root}>
          <Header name="..." picture={mock.petPicture} />
          <View style={styles.body}>
            <ImageBackground source={require('../assets/images/bg.png')} style={styles.bg}>
              <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" color="white" style={{"marginTop":50}}/>
              </View>
            </ImageBackground>
          </View>
        </View> 
      )
    } else {
      return (
            <View style={styles.root}>
              <Header name={petName} picture={mock.petPicture} />
              <View style={styles.body}>
                <ImageBackground source={require('../assets/images/bg.png')} style={styles.bg}>
                  <View style={styles.buttonsContainer}>
                    <ButtonStats
                      screen={screen}
                      onPressButton={this.onPressButton}
                    />
                  </View>
                  <View style={styles.graphContainer}>
                    <Text style={styles.text}>{screen}</Text>
                    <Graph
                      data={dataLineChar.graphData}
                      yAxisSuffix={dataLineChar.yAxisSuffix}
                      height={300}
                      onDataPointClick={(value) => {
                        Alert.alert(value.value + dataLineChar.yAxisSuffix), (styles) => { styles.button }
                      }}
                    />
                  </View>
                </ImageBackground>
              </View>
            </View>
      );
    }
  }
}

StatsScreen.navigationOptions = { header: null };


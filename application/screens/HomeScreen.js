import React from 'react';
import { StyleSheet, View, ImageBackground, ActivityIndicator } from 'react-native';
import Header from '../components/Header/Header';
import Graph from '../components/Graph/Graph';
import Reservoir from '../components/Reservoir/Reservoir';
import HomeInfos from '../components/HomeInfos/HomeInfos';
import { config } from '../constants/config';
import { storeData, retrieveData } from '../components/LocalStorageBilly/LocalStorageBilly';

const mock = {
  userId: 1,
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
    height: '100%'
  },
  graphContainer: { flex: 2 }
});

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      user: {},
      gamelle: {},
      animal: {},
      weight: {},
      graphData: {},
      yAxisSuffix: ' kg'
    }
  }

  componentDidMount() {
    console.log('***************');
    this.getData();
  }

  componentDidUpdate() {
    this.getLocalStorage();
  }

  getLocalStorage = async () => {
    let user = await retrieveData('user');
    let gamelle = await retrieveData('gamelle');
    let animal = await retrieveData('animal');
    let weight = await retrieveData('weight');
    let graphData = await retrieveData('graphWeight');
    let newWeight = await retrieveData('newWeight');

    if (user && gamelle && animal && weight && graphData && newWeight && newWeight.isNewWeight === false) {
      this.setState({
        user,
        gamelle,
        animal,
        weight,
        graphData,
        isLoaded: true
      });
    } else {
      this.getData();
    }
  }

  setLocalStorage = async () => {
    storeData('user', this.state.user);
    storeData('gamelle', this.state.gamelle);
    storeData('animal', this.state.animal);
    storeData('weight', this.state.weight);
    storeData('graphWeight', this.state.graphData);
  }

  getData = async () => {
    try {
      console.log('===> REQUEST HOME SCREEN');
      const res = await fetch(`${config.urlApi}/home?id=${mock.userId}`, {
        method: 'GET',
        headers: config.headers
      });
      const result = await res.json();
      console.log(result);
      
      if (result) {
        this.setState({
          user: result.result.resultUser[0],
          gamelle: result.result.resultGamelle[0],
          animal: result.result.resultAnimal[0],
          weight: result.result.resultPoids,
        });
        this.converDataForGraph();
      }
    }
    catch (err) { console.log('===> ', err) }
  }

  converDataForGraph = async () => {
    const labels = [];
    const data = [];

    for (let i = 4; i >= 0; i--) {
      const date = new Date(this.state.weight[i].date);
      const time = `${date.getDate() > 10 ? date.getDate() : `0${date.getDate()}`}/0${date.getMonth() + 1}`;
      labels.push(time);
      data.push(this.state.weight[i].kg);
    }

    this.setState({
      graphData: {
        labels,
        datasets: [{ data }]
      }
    });

    this.setLocalStorage();

    const graph = await retrieveData('graphWeight');
    if (graph) {
      this.setState({ isLoaded: true });
      storeData('newWeight', {isNewWeight: false});
    } else {
      console.log('erreur de stockage de données');
    }
  }

  render() {
    const { isLoaded, animal, gamelle, graphData, yAxisSuffix } = this.state;
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
          <Header name={animal.nom} picture={mock.petPicture} />
          <View style={styles.body}>
            <ImageBackground source={require('../assets/images/bg.png')} style={styles.bg}>
              <HomeInfos
                foodQuantity={gamelle.dose}
                lastWeight={graphData.datasets[0].data[graphData.datasets[0].data.length - 1]}
                objective={animal.objpoid}
                diet={animal.typeregime}
              />
              <View style={styles.graphContainer}>
                <Graph data={graphData} yAxisSuffix={yAxisSuffix} height={150} />
              </View>
              <Reservoir data={gamelle.reserve} />
            </ImageBackground>
          </View>
        </View> 
      );
    }
  }
}

HomeScreen.navigationOptions = { header: null };

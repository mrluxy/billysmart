import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  text: {
    color: Colors.whiteColor,
    fontFamily: 'amiko-regular',
    fontSize: 14
  },
  foodContainer: {
    flex: 2.5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textFood: {
    color: Colors.whiteColor,
    fontFamily: 'amiko-regular',
    fontSize: 64
  },
  dietContainer: {
    flex: 1.5
  },
  textDietContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  textDiet: {
    flex: 2,
    color: Colors.whiteColor,
    fontFamily: 'amiko-regular',
    fontSize: 14,
    marginLeft: 50
  },
  textDietData: {
    flex: 1,
    color: Colors.whiteColor,
    fontFamily: 'amiko-regular',
    fontSize: 14,
    textAlign: 'right',
    marginRight: 50
  }
});

export default class HomeInfos extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { foodQuantity, objective, lastWeight, diet } = this.props;

    return(
      <>
        <View style={styles.foodContainer}>
          <Text style={styles.text}>Dose journalière :</Text>
          <Text style={styles.text}>
            <Text style={styles.textFood}>{foodQuantity}</Text> g
        </Text>
        </View>
        <View style={styles.dietContainer}>
          <View style={styles.textDietContainer}>
            <Text style={styles.textDiet}>Dernière pesée :</Text>
            <Text style={styles.textDietData}>{lastWeight} kg</Text>
          </View>
          <View style={styles.textDietContainer}>
            <Text style={styles.textDiet}>Objectif visé :</Text>
            <Text style={styles.textDietData}>{objective} kg</Text>
          </View>
          <View style={styles.textDietContainer}>
            <Text style={styles.textDiet}>Régime suivi :</Text>
            <Text style={styles.textDietData}>{diet}</Text>
          </View>
        </View>
      </>
    );
  }
}
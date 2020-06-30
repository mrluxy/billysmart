import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Colors from '../../constants/Colors';

const mock = {
  total: 2000,
  fullWidth: 220
}

const styles = StyleSheet.create({
  reservoirContainer: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  textReservoir: {
    color: Colors.whiteColor,
    fontFamily: 'amiko-regular',
    fontSize: 14
  },
  reservoir: {
    width: mock.fullWidth,
    height: 24,
    borderColor: Colors.whiteColor,
    borderRadius: 30/2,
    borderWidth: 2,
    position: 'relative'
  },
  plainReservoir: {
    position: 'absolute',
    backgroundColor: Colors.whiteColor,
    height: 20,
    borderRadius: 30/2,
  }
})

export default class Reservoir extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data } = this.props;
    return(
      <View style={styles.reservoirContainer}>
        <Text style={styles.textReservoir}>Réservoir :</Text>
        <View style={styles.reservoir}>
          <View style={styles.plainReservoir} width={data * mock.fullWidth / mock.total}></View>
        </View>
      </View>
    );
  }
}
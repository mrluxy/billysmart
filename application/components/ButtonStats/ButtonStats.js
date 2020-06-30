import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


const styles = StyleSheet.create({
  img: {
    width: 70,
    height: 70
  }
})

export default class ButtonStats extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { screen, onPressButton } = this.props;
    return (
      <>
        <TouchableOpacity onPress={() => onPressButton('gamelle')}>
          <Image
            style={styles.img}
            source={screen === 'gamelle' ? require('./images/gamelleHover.png') : require('./images/gamelle.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onPressButton('balance')}>
          <Image
            style={styles.img}
            source={screen === 'balance' ? require('./images/balanceHover.png') : require('./images/balance.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onPressButton('nourriture')}>
          <Image
            style={styles.img}
            source={screen === 'nourriture' ? require('./images/croquetteHover.png') : require('./images/croquette.png')}
          />
        </TouchableOpacity>
      </>
    );
  }
}
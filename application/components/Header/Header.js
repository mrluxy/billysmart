import React from 'react';
import { StyleSheet, View, Text, Image, ImageBackground } from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  header: {
    flex: 3
  },
  bgHeader: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    flex: 2
  },
  textHeader: {
    fontFamily: 'amiko-bold',
    fontSize: 16,
    color: Colors.whiteColor,
    fontSize: 50,
    letterSpacing: 5,
    paddingLeft: 20
  },
  subheader: {
    flex: 1,
    backgroundColor: Colors.whiteColor
  },
  imgContainer: {
    position: 'absolute',
    top: '-125%',
    right: 20,
    width: 125,
    height: 125
  },
  img: {
    width: 125,
    height: 125,
    borderRadius: 125 / 2,
    borderColor: Colors.whiteColor,
    borderWidth: 3,
  },
});

export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { name, picture } = this.props;
    return (
      <View style={styles.header}>
        <ImageBackground source={require('./header.png')} style={styles.bgHeader}>
          <Text style={styles.textHeader}>{name}</Text>
        </ImageBackground>
        <View style={styles.subheader}>
          <View style={styles.imgContainer}>
            <Image source={{uri: picture}} style={styles.img}></Image>
          </View>
        </View>
      </View>
    );
  }
}

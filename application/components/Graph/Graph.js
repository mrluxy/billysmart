import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { LineChart } from "react-native-chart-kit";
import Colors from '../../constants/Colors';

const chartConfig = {
  backgroundColor: "transparent",
  backgroundGradientFrom: "white",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "black",
  backgroundGradientToOpacity: 0,
  decimalPlaces: 0,
  color: () => Colors.whiteColor,
  labelColor: () => Colors.whiteColor,
  style: { borderRadius: 15 },
  propsForDots: { r: "4" },
  propsForBackgroundLines: {strokeDasharray: ""}
};

const styles = StyleSheet.create({
  graph: {backgroundColor: 'transparent'}
});

export default class Graph extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data, yAxisSuffix, height, onDataPointClick } = this.props;
    
    return (
      <View style={styles.graphContainer}>
        <LineChart
          data={data}
          width={Dimensions.get("window").width - 60}
          height={height}
          xLabelsOffset={-10}
          yAxisSuffix={yAxisSuffix}
          chartConfig={chartConfig}
          withInnerLines={false}
          withShadow={false}
          fromZero={true}
          segments={4}
          bezier
          style={styles.graph}
          onDataPointClick={onDataPointClick ? onDataPointClick : () => {}}
        />
      </View>
    );
  }
}
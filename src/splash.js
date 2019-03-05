/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Image,
  AsyncStorage
} from "react-native";
import AppNavigator from "./RootNavigation";
import AppNavigator2 from "./RootNavigation2";
const icon = require("../images/logo.png");
const { width, height } = Dimensions.get("window");

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = { getting_Started: 0 };
  }
  componentDidMount = () => {
    retrieveData("getting_Started", (result, error) => {
      if (result) {
        this.setState({ getting_Started: 2 });
      } else {
        this.setState({ getting_Started: 1 });
      }
    });
  };
  render() {
    if (this.state.getting_Started === 1) {
      return <AppNavigator />;
    } else if (this.state.getting_Started === 2) {
      return <AppNavigator2 />;
    }
    return (
      <View style={styles.mainContainer}>
        <View style={styles.sliderItemContainer}>
          <Image
            source={icon}
            style={styles.imageContentArea}
            resizeMode="contain"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    padding: 8
  },
  sliderItemContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    flexDirection: "column"
  },
  textContentAreaTitle: {
    margin: 16,
    fontSize: 24,
    color: "black",
    textAlign: "center"
  },
  imageContentArea: { width: width - 50, height: width - 50 }
});

const retrieveData = (key, callBack) => {
  AsyncStorage.getItem(key, (error, result) => {
    console.log(result);

    if (error) {
      console.log(error);
      callBack(null, error);
    } else {
      console.log(result);
      callBack(result, null);
    }
  });
};

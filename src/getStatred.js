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
import { Button, Card, ListItem } from "react-native-elements";
import { RNCamera, FaceDetector } from "react-native-camera";

const icon = require("../images/Logo-full.png");
const { width, height } = Dimensions.get("window");
const FONT_NAME = "AvenirNext-Regular";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = { visible: false };
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.sliderItemContainer}>
          <Image
            source={icon}
            style={styles.imageContentArea}
            resizeMode="contain"
          />
          <Text style={styles.textContentAreaTitle}>
            The app that lets you know if your food is good for you based on the
            ingredients
          </Text>
        </View>
        <Button
          buttonStyle={{ marginTop: 8 }}
          onPress={() => {
            this.props.navigation.push("GetStarted2");
          }}
          rounded
          large
          backgroundColor="#85bf43"
          title="Let’s do this"
          textStyle={{
            fontSize: 20,
            color: "#ffffff",
            fontWeight: "normal",
            fontFamily: FONT_NAME
          }}
        />
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
    fontSize: 16,
    color: "#333333",
    textAlign: "center",
    fontFamily: FONT_NAME
  },
  imageContentArea: { width: width - 50, height: width - 50, marginVertical: 8 }
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

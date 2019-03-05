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
import { Button, Card, ListItem, CheckBox } from "react-native-elements";
import { RNCamera, FaceDetector } from "react-native-camera";

const icon = require("../images/logo.png");
const { width, height } = Dimensions.get("window");
const FONT_NAME = "AvenirNext-Regular";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = { selectedIndex: 0 };
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
            Why are you choosing this app?
          </Text>
          <View style={{ alignSelf: "stretch" }}>
            <CheckBox
              textStyle={styles.checkBoxStyle}
              title="I have diabetes"
              checked={this.state.selectedIndex === 1}
              onPress={() => {
                this.setState({ selectedIndex: 1 });
              }}
            />
            <CheckBox
              textStyle={styles.checkBoxStyle}
              title="I have a food allergy"
              checked={this.state.selectedIndex === 2}
              onPress={() => {
                this.setState({ selectedIndex: 2 });
              }}
            />
            <CheckBox
              textStyle={styles.checkBoxStyle}
              title="I just want to be healthy"
              checked={this.state.selectedIndex === 3}
              onPress={() => {
                this.setState({ selectedIndex: 3 });
              }}
            />
          </View>
        </View>

        <Button
          buttonStyle={{
            marginTop: 16,
            paddingHorizontal: 40
          }}
          onPress={this.continue}
          rounded
          large
          backgroundColor="#85bf43"
          title="Continue"
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
  continue = () => {
    if (this.state.selectedIndex === 0) {
      alert("Please select one option.");
      return;
    }
    storeData("getting_Started", `${this.state.selectedIndex}`);
    this.props.navigation.push("Scanner");
  };
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
    alignSelf: "stretch",
    paddingHorizontal: "5%",
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
  imageContentArea: {
    width: width * 0.5,
    height: width * 0.5,
    marginVertical: 8,
    marginBottom: 40
  },
  checkBoxStyle: {
    fontSize: 16,
    color: "#333333",
    fontWeight: "normal",
    fontFamily: FONT_NAME
  }
});

const storeData = (key, value, fnc) => {
  AsyncStorage.setItem(key, value ? value : "", fnc);
};

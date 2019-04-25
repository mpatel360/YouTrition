// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow
//  * @lint-ignore-every XPLATJSCOPYRIGHT1
//  */

// import React, {Component} from 'react';
// import {Platform, StyleSheet, Text, View,
//         Image} from 'react-native';

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

// type Props = {};
// export default class App extends Component<Props> {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>Welcome to a React Native App Manan!</Text>
//         <Text style={styles.instructions}>To get started, edit App.js</Text>
//         <Text style={styles.instructions}>{instructions}</Text>

//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });





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
  AsyncStorage,
  Platform
} from "react-native";
import { Button, Card, ListItem } from "react-native-elements";

const icon = require("./images/Logo-full.png");
const { width, height } = Dimensions.get("window");
const FONT_NAME = "Rubik";

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

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
            The greatest app that lets you know if your food is good for you based on the
            ingredients
          </Text>
        </View>
        <Button
          buttonStyle={{ marginTop: 8 }}
          // onPress={() => {
          //   this.props.navigation.push("GetStarted2");
          // }}
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
// #f9b89c peach matte
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#4F6D7A",
    justifyContent: "center",
    alignItems: "center",
    padding: 8
  },
  sliderItemContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4F6D7A",
    flexDirection: "column"
  },
  textContentAreaTitle: {
    margin: 16,
    fontSize: 16,
    color: "#ffffff",
    // color: "#4F6D7A",
    textAlign: "center",
    fontFamily: FONT_NAME
  },
  imageContentArea: { width: width - 50, height: width - 50, marginVertical: 8 }
});




// import React, { Component } from 'react';
// import {
//   Platform,
//   StyleSheet,
//   Text,
//   View,
//   StatusBar
// } from 'react-native';

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' +
//     'Cmd+D or shake for dev menu',
//   android: 'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

// export default class App extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <StatusBar
//           barStyle="light-content"
//           backgroundColor="#4F6D7A"
//         />
//         <Text style={styles.welcome}>
//           Welcome to React Native!
//         </Text>
//         <Text style={styles.instructions}>
//           To get started, edit App.js
//         </Text>
//         <Text style={styles.instructions}>
//           {instructions}
//         </Text>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#4F6D7A',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//     color: '#F5FCFF',
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#F5FCFF',
//     marginBottom: 5,
//   },
// });
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
  Image,
  Modal
} from "react-native";
import { Button, Card, ListItem } from "react-native-elements";
import { RNCamera, FaceDetector } from "react-native-camera";
import of from "of";

const icon = require("../images/logo.png");
const loaderimage = require("../images/loaderImage.png");
const unhealthyimage = require("../images/unhealthyimage.png");
const healthyimage = require("../images/healthyimage.png");
const scnnerImage = require("../images/scnnerImage.png");

const { width, height } = Dimensions.get("window");
const FONT_NAME = "AvenirNext-Regular";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      torchMode: "off",
      cameraType: "back",
      barcode: "",
      showCamera: false,
      loading: false,
      result: ""
    };
  }

  barcodeReceived(e) {
    console.log("Barcode: " + e.data);
    console.log("Type: " + e.type);
  }

  renderLoader() {
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.textContentAreaTitle}>{this.state.barcode}</Text>
        <View style={styles.sliderItemContainer}>
          <Image
            source={loaderimage}
            style={styles.loaderimage}
            resizeMode="contain"
          />
        </View>
      </View>
    );
  }

  render() {
    if (this.state.loading) {
      return this.renderLoader();
    }
    if (this.state.result) {
      return this.renderResult();
    }
    return (
      <View style={styles.mainContainer}>
        <View style={styles.sliderItemContainer}>
          <Image
            source={icon}
            style={styles.imageContentArea}
            resizeMode="contain"
          />
          <Text style={styles.textContentAreaTitle}>
            Take a photo and choose a photo of ingredients
          </Text>
        </View>
        <Button
          buttonStyle={{ marginTop: 8 }}
          onPress={() => {
            //this.fetchData();
            this.setState({ showCamera: true, barcode: "" });
          }}
          rounded
          large
          backgroundColor="#85bf43"
          title="Take a photo"
          textStyle={{
            fontSize: 20,
            color: "#ffffff",
            fontWeight: "normal",
            fontFamily: FONT_NAME
          }}
        />

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.showCamera}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          {this.renderCamera()}
        </Modal>
      </View>
    );
  }

  renderResult() {
    let { healthy, message } = this.state.result;

    let mainstyle = {
      ...styles.mainContainer,
      backgroundColor: healthy ? "#85bf43" : "#eb8c30"
    };
    let textstyle = { ...styles.textContentAreaTitle, color: "white" };
    let image = healthy ? healthyimage : unhealthyimage;

    return (
      <View style={mainstyle}>
        <View style={styles.sliderItemContainer}>
          <Image
            source={image}
            style={styles.loaderimage}
            resizeMode="contain"
          />
          <Text style={textstyle}>{message}</Text>
        </View>
        <Button
          buttonStyle={{ marginTop: 8 }}
          onPress={() => {
            this.setState({ showCamera: false, loading: false, result: null });
          }}
          rounded
          large
          backgroundColor={!healthy ? "#85bf43" : "#eb8c30"}
          title="Check Another Product"
          textStyle={{
            fontSize: 16,
            color: "#ffffff",
            fontWeight: "normal",
            fontFamily: FONT_NAME
          }}
        />
      </View>
    );
  }

  renderCamera() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          permissionDialogTitle={"Permission to use camera"}
          permissionDialogMessage={
            "We need your permission to use your camera phone"
          }
          onBarCodeRead={barcodes => {
            console.log(barcodes);
            if (this.state.showCamera) {
              this.setState(
                { barcode: barcodes.data, showCamera: false },
                () => {
                  this.fetchData();
                }
              );
            }
          }}
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.log(barcodes);
          }}
        />

        <View
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
          }}
        >
          <View
            style={{
              flex: 1,
              alignSelf: "stretch",
              backgroundColor: "#000",
              opacity: 0.5
            }}
          />
          <View style={{ flex: 1, alignSelf: "stretch" }} />

          <View
            style={{
              flex: 1,
              alignSelf: "stretch",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: 32,
              flexDirection: "column",
              backgroundColor: "rgba(0,0,0,0.5)"
            }}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: "normal",
                fontFamily: FONT_NAME,
                color: "white",
                marginBottom: 20
              }}
            >
              {this.state.barcode ? "Barcode Detected" : "Scan Barcode"}
            </Text>
            {this.state.barcode.length > 0 && (
              <Text
                style={{
                  fontSize: 20,
                  color: "white",
                  margin: 8,
                  marginBottom: 16,
                  fontWeight: "bold"
                }}
              >
                {this.state.barcode}
              </Text>
            )}

            <View
              style={{
                flex: 0,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: 8
              }}
            >
              {this.state.barcode.length > 0 && (
                <Button
                  onPress={() => {
                    this.setState({ showCamera: false }, () => {
                      this.fetchData();
                    });
                  }}
                  rounded
                  backgroundColor="#85bf43"
                  title="CONTINUE"
                  textStyle={{
                    fontSize: 20,
                    color: "#ffffff",
                    fontWeight: "normal",
                    fontFamily: FONT_NAME
                  }}
                />
              )}

              <Button
                onPress={() => {
                  this.setState({ showCamera: false });
                }}
                rounded
                large
                title="CANCEL"
                textStyle={{
                  fontSize: 20,
                  color: "#ffffff",
                  fontWeight: "normal",
                  fontFamily: FONT_NAME
                }}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }

  fetchData = () => {
    this.setState({ loading: true });
    this.fetchIngredeants((food, error) => {
      if (food) {
        this.fetchResult(food.foodContentsLabel, (result, err, healthy) => {
          if (result) {
            this.setState({
              loading: false,
              result: { healthy: healthy, message: result }
            });
          } else {
            this.setState({ loading: false });
            setTimeout(() => {
              alert(err.message);
            }, 500);
          }
        });
      } else {
        this.setState({ loading: false });
        setTimeout(() => {
          alert(error.message);
        }, 500);
      }
    });
  };

  fetchIngredeants = fnc => {
    let url = `https://api.edamam.com/api/food-database/parser`;
    GET(
      url,
      {},
      {
        upc: this.state.barcode,
        app_id: "c7547c4f",
        app_key: "f799a9b249c3a96f17d715a58a31cac9"
      },
      (error, response) => {
        if (response) {
          let { hints } = response;
          if (hints && hints.length > 0) {
            let hint = hints[0];
            let { food } = hint;
            let { label, foodContentsLabel } = food;
            fnc(food, error);
          } else {
            //console.log(`Error ${response}`);
            fnc(null, response);
          }
        } else {
          fnc(null, error);
        }
      }
    );
  };
  fetchResult = (ingredients, fnc) => {
    let url = `http://13.232.170.63/ing_app/public/api/v1/ingredients`;
    GET(
      url,
      {},
      {
        alt_names: ingredients,
        limit: 1,
        page: 1
      },
      (error, response) => {
        debugger;
        if (response) {
          let { data, message } = response;
          if (data.length > 0) {
            let result = data[0];
            let { bad_reason } = result.attributes;
            fnc(bad_reason, error, false);
          } else {
            fnc(message, error, true);
          }
        } else {
          fnc(null, error, true);
        }
      }
    );
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
    alignItems: "center",
    justifyContent: "center",
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
  loaderimage: {
    width: width * 0.8,
    height: width * 0.8,
    marginVertical: 8,
    marginBottom: 40
  },
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black"
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  capture: {
    flex: 0,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: "center",
    margin: 20
  }
});

const REQUEST = (method, url, headers, params, callback, isJSON) => {
  let options = {
    method: method
  };

  let body = "";

  console.log(params);

  Object.keys(params).forEach(function(key) {
    if (body.length > 0) {
      body = body + "&";
    } else {
      body = body + "?";
    }

    let value = params[key];
    body = body + key + "=" + encodeURIComponent(value);
  });

  options.headers = headers;

  if (method == "GET") {
    url = url + body;
  } else if (body.length > 0) {
    options.body = body;
  }

  // let spaceRegex = / /g;
  // url = url.replace(spaceRegex, `%20`);

  //url = encodeURIComponent(url);

  fetch(url, options)
    .then(response => response.json())
    .then(responseJson => {
      console.log(url);
      console.log(options);
      console.log(responseJson);
      callback(null, responseJson);
    })
    .catch(error => {
      console.log(url);
      console.log(options);
      console.log(error);
      callback(error, null);
    });
};

const GET = (url, headers, params, callback) => {
  REQUEST("GET", url, headers, params, callback, false);
};

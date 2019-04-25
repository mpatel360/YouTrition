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
    // CALCULATING PAGE
    console.log("got something!" + this.state.barcode)
    console.log('RENDERLOADER')
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
    console.log('INITIAL SCREEN')
    return ( 
      // Before TAKE A PHOTO SCREEN

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

  // render() {
  //   const { loading, showCamera } = this.state;
  //   // console.log('====state====', this.state);
  //   if (loading) {
  //     return this.renderLoader();
  //   }
  //   // if (result) {
  //   //   return this.renderResult();
  //   // }
  //   return (
  //     <View style={styles.mainContainer}>
  //       <Modal
  //         animationType="slide"
  //         transparent={false}
  //         visible={showCamera}
  //         onRequestClose={() => {
  //           // Alert.alert('Modal has been closed.');
  //         }}
  //       >
  //         {this.renderCamera()}
  //       </Modal>
  //     </View>
  //   );
  // }

  renderResult() {
    // RESULT PAGE (tells if this item is beneficial or not)
    // let { healthy, message } = this.state.result; //gotten from some outside source
    console.log('RESULT SCREEN')
    let { result } = this.state;
    let { healthy, message, ingredients } = result;


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
          {/* <Text style={[textstyle, { textAlign: 'left' }]}>
            <Text style={[textstyle, { fontWeight: '600' }]}>
              Ingredients:&nbsp;
            </Text>
            {ingredients}
          </Text> */}
        </View>
        <Button
          buttonStyle={{ marginTop: 8 }}
          onPress={() => {
            this.setState({ showCamera: false, loading: false, result: null });
          }}
          rounded
          large
          backgroundColor={!healthy ? "#85bf43" : "#eb8c30"} // green, or red
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

  onCancelCamera = () => {
    console.log('CANCEL CAMERA')
    const { navigation } = this.props;
    this.setState({ showCamera: false });
    navigation.goBack();
  };

  checkAnotherProduct = () => {
    console.log('CHECKANOTHERPRODUCT')
    const { navigation } = this.props;
    this.setState({ showCamera: false, loading: false, result: null });
    navigation.goBack();
  };

  renderCamera() {
    return (
      // TAKE A PHOTO SCREEN
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          barcodeFinderWidth={width * 0.926}
          barcodeFinderHeight={width * 0.618}
          barcodeFinderVisible
          barcodeFinderBorderColor="red"
          barcodeFinderBorderWidth={3}

          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}       
          permissionDialogTitle={"Permission to use camera"}
          permissionDialogMessage={"We need your permission to use your camera phone"}
          onBarCodeRead={barcodes => {
            console.log('BARCODES ');
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
            console.log('Barcodes Detected!:', barcodes);
          }}
        />

        <View style={styles.style1}>
          <View style={styles.style2} />
          <View style={{ flex: 1, alignSelf: "stretch" }} />

          <View style={styles.style3}>
            <Text style={styles.style4}>
              {this.state.barcode ? "Barcode Detected" : "Position Barcode Here"}
            </Text>
            {this.state.barcode.length > 0 && (
              <Text style={styles.style5}>
                {this.state.barcode}
              </Text>
            )}

            <View style={styles.style6}>
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
                // onPress={() => {
                //   this.setState({ showCamera: false });
                // }}
                onPress={this.onCancelCamera}
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
    console.log('FETCHDATA')
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
    let { barcode } = this.state;
    let url = `https://api.edamam.com/api/food-database/parser`;
    console.log('FETCHINGREDIENTS')
    console.log(fnc)
    GET(
      url,
      {},
      {
        upc: barcode,
        app_id: "c7547c4f",
        app_key: "f799a9b249c3a96f17d715a58a31cac9"
      },
      (error, response) => {
        if (response) {
          let { hints } = response;
          if (hints && hints.length > 0) {
            let hint = hints[0];
            let { food } = hint;
            let { label, foodContentsLabel } = food; // seems unncessary
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
    console.log('FETCHRESULT')

    console.log(fnc)
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
  style1: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
  },
  style2: {
      flex: 1,
      alignSelf: "stretch",
      backgroundColor: "#000",
      opacity: 0.5
  },
  style3: {
      flex: 1,
      alignSelf: "stretch",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      paddingBottom: 32,
      flexDirection: "column",
      backgroundColor: "rgba(0,0,0,0.5)"
  },
  style4: {
      fontSize: 24,
      fontWeight: "normal",
      fontFamily: FONT_NAME,
      color: "white",
      marginBottom: 20
  },
  style5: {
      fontSize: 20,
      color: "white",
      margin: 8,
      marginBottom: 16,
      fontWeight: "bold"
  },
  style6: {
      flex: 0,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      paddingBottom: 8
  },
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
  console.log('REQUEST Params:' )
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

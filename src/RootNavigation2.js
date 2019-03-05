import { createStackNavigator, createAppContainer } from "react-navigation";
import Scanner from "./scanner";

const AppNavigator = createStackNavigator(
  {
    Scanner: Scanner
  },
  {
    headerMode: "none"
  }
);

export default createAppContainer(AppNavigator);

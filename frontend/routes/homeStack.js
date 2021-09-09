import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import MainScreen from "../screens/MainScreen";
import Result from "../screens/Result";

const screens = {
  MainScreen: {
    screen: MainScreen,
  },

  Result: {
    screen: Result,
  },
};

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);

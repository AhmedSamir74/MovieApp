import React, { Component } from "react";
import { Text, Animated, View } from "react-native";
import { SCREEN_HEIGHT } from "../../../constants";
import styles from "./style";
class AnimatedToast extends Component<any> {
  fadeAnim: Animated.Value;
  state: {
    message: string;
  };
  constructor(props: any) {
    super(props);

    this.fadeAnim = new Animated.Value(SCREEN_HEIGHT + 100);
    this.state = {
      message: "",
    };
  }
  componentDidMount() {
    this.props.onRef(this);
  }
  componentWillUnmount() {
    this.props.onRef(undefined);
  }
  showToast(message: string) {
    this.setState({ message }, () => {
      Animated.timing(this.fadeAnim, {
        toValue: SCREEN_HEIGHT * 0.78,
        duration: 800,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          Animated.timing(this.fadeAnim, {
            toValue: SCREEN_HEIGHT + 100,
            duration: 500,
            useNativeDriver: true,
          }).start();
        }, 3000);
      });
    });
  }
  render() {
    return (
      <Animated.View
        style={[
          styles.toastCont,
          {
            transform: [{ translateY: this.fadeAnim }],
          },
        ]}
      >
        <View style={styles.touchableOpacity}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Text style={styles.toastText}>{this.state.message}</Text>
          </View>
        </View>
      </Animated.View>
    );
  }
}
export default AnimatedToast;

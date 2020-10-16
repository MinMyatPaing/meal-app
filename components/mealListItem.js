import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  ImageBackground,
  Platform,
} from "react-native";

import DefaultText from '../components/defaultText';

const MealListItem = ({
  title,
  duration,
  complexity,
  affordability,
  imageUrl,
  onPress,
}) => {
  let TouchableComponent = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }

  return (
    <View style={styles.mealItem}>
      <TouchableNativeFeedback onPress={onPress}>
        <View>
          <View style={styles.topPart}>
            <ImageBackground
              style={styles.mealImage}
              source={{ uri: imageUrl }}
            >
              <Text style={styles.mealTitle}>{title}</Text>
            </ImageBackground>
          </View>
          <View style={styles.bottomPart}>
            <DefaultText>{duration}m</DefaultText>
            <DefaultText>{complexity.toUpperCase()}</DefaultText>
            <DefaultText>{affordability.toUpperCase()}</DefaultText>
          </View>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

export default MealListItem;

const styles = StyleSheet.create({
  mealItem: {
    flex: 1,
    height: 200,
    backgroundColor: "#ccc",
    borderRadius: 15,
    overflow: "hidden",
    margin: 10,
  },
  topPart: {
    height: "85%",
  },
  mealImage: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  mealTitle: {
    fontSize: 20,
    fontFamily: "open-sans-bold",
    color: "white",
    backgroundColor: "rgba(0, 0, 0, .5)",
    paddingVertical: 7,
    paddingHorizontal: 12,
    textAlign: "center",
  },
  bottomPart: {
    flexDirection: "row",
    height: "15%",
    alignItems: "center",
    justifyContent: "space-around",
  },
});

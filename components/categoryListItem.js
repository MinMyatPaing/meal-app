import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";

const CategoryListItem = ({ title, color, onPress }) => {

  let TouchableComponent = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableComponent = TouchableNativeFeedback;
  }
  return (
    <View style={styles.gridItem}>
      <TouchableComponent onPress={onPress}>
        <View
          style={{
            ...styles.itemContainer,
            backgroundColor: color,
          }}
        >
          <Text style={styles.itemTitle}>{title}</Text>
        </View>
      </TouchableComponent>
    </View>
  );
};

export default CategoryListItem;

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 15,
    height: 150,
    borderRadius: 15,
    overflow: Platform.OS === 'android' ? "hidden" : "visible",
    elevation: 4
  },
  itemContainer: {
    flex: 1,
    padding: 15,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 4,
    shadowOpacity: 0.4,
    borderRadius: 15,
  },
  itemTitle: {
    fontSize: 18,
    fontFamily: "open-sans-bold",
    textAlign: "right",
  },
});

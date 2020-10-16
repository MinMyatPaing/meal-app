import React, { useState, useEffect, useCallback } from "react";
import { View, Text, Switch, StyleSheet, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch } from "react-redux";

import HeaderButton from "../components/headerButton";
import Colors from "../constants/Colors";
import { SAVE_FILTERS } from '../store/actions/actions';

const FilterSwitch = ({value, label, onValueChange}) => {
  return (
    <View style={styles.filterGroup}>
      <Text style={styles.label}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={Colors.secondary}
        thumbColor={Platform.OS === "android" ? Colors.primary : ""}
      />
    </View>
  );
};

const FilterScreen = ({navigation}) => {
  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);

  const dispatch = useDispatch();

  const saveFilterInfo = useCallback(() => {
    const filterInfo={
      isGlutenFree,
      isLactoseFree,
      isVegan,
      isVegetarian,
    }
    dispatch({type: SAVE_FILTERS, filters: filterInfo});
  }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian]);

  
  useEffect(() => {
    navigation.setParams({save: saveFilterInfo});
  }, [saveFilterInfo])

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Filters / Restrictions</Text>
      <FilterSwitch value={isGlutenFree} onValueChange={(newValue) => setIsGlutenFree(newValue)} label="Gluten-free" />
      <FilterSwitch value={isLactoseFree} onValueChange={(newValue) => setIsLactoseFree(newValue)} label="Lactose-free" />
      <FilterSwitch value={isVegan} onValueChange={(newValue) => setIsVegan(newValue)} label="Vegan" />
      <FilterSwitch value={isVegetarian} onValueChange={(newValue) => setIsVegetarian(newValue)} label="Vegetarian" />
    </View>
  );
};

FilterScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: "Filter",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="MENU"
          iconName="ios-menu"
          onPress={() => {
            navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="SAVE"
          iconName="ios-save"
          onPress={navigation.getParam('save')}
        />
      </HeaderButtons>
    )
  };
};

export default FilterScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
    marginTop: 20,
  },
  filterGroup: {
    marginVertical: 15,
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

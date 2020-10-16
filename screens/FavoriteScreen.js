import React from "react";
import { View, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector } from 'react-redux';

import MealList from "../components/mealList";
import HeaderButton from '../components/headerButton';
import DefaultText from "../components/defaultText";

const FavoriteScreen = ({ navigation }) => {
  
  const favMeals = useSelector(state => state.meals.favoriteMeals);

  if(favMeals.length === 0 || !favMeals) {
    return (
      <View style={styles.fallBackText}>
        <DefaultText>No Favorites Found! Select one or more to see Favorite Meals</DefaultText>
      </View>
    )
  }

  return <MealList navigation={navigation} categoryMeals={favMeals} />;
};

FavoriteScreen.navigationOptions = ({navigation}) => {
    
  return {
    headerTitle: "Your Favorites",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="MENU" iconName="ios-menu" onPress={() => {
            navigation.toggleDrawer();
        }} />
      </HeaderButtons>
    )
  };
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallBackText: {
    flex: 1,
    marginHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

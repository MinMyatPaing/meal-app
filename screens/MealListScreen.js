import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import { CATEGORIES } from "../data/dummy-data";
import MealList from '../components/mealList';

const MealListScreen = ({ navigation }) => {
  const categoryId = navigation.getParam("categoryId");

  const filteredMeals = useSelector(state => state.meals.filteredMeals);

  console.log(filteredMeals);

  const categoryMeals = filteredMeals.filter(
    (meal) => meal.categoryIds.indexOf(categoryId) >= 0
  );
  
  if(categoryMeals.length === 0) {
    return <View style={styles.fallbackText}><Text>No meals matches your filters!</Text></View>
  }

  return <MealList navigation={navigation} categoryMeals={categoryMeals} />;
};

MealListScreen.navigationOptions = (navigationData) => {
  const catId = navigationData.navigation.getParam("categoryId");
  const selectedCategory = CATEGORIES.find((cat) => cat.id === catId);

  return {
    headerTitle: selectedCategory.title,
  };
};

const styles = StyleSheet.create({
  fallbackText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default MealListScreen;
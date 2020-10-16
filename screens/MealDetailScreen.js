import React, { useCallback, useEffect } from "react";
import { ScrollView, View, Text, Image, StyleSheet } from "react-native";
import { Item, HeaderButtons } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from "../components/headerButton";
import DefaultText from "../components/defaultText";
import { TOGGLE_FAVORTIE } from '../store/actions/actions';

const ListItem = ({ info, style }) => {
  return (
    <View style={{ ...styles.listItem, ...style }} key={info}>
      <Text>- {info}</Text>
    </View>
  );
};

const MealDetailScreen = ({ navigation }) => {

  const mealId = navigation.getParam("mealId");
  const availableMeals = useSelector(state => state.meals.meals);

  const meal = availableMeals.find((meal) => meal.id === mealId);
  const currentMealIsFav = useSelector(state => state.meals.favoriteMeals.some(meal => meal.id === mealId));

  const dispatch=useDispatch();

  const toggleFavHandler = useCallback(() => {
    dispatch({type: TOGGLE_FAVORTIE, mealId: mealId});
  }, [dispatch, mealId])

  useEffect(() => {
    navigation.setParams({toggleFav: toggleFavHandler});
  }, [toggleFavHandler])

  useEffect(() => {
    navigation.setParams({isFav: currentMealIsFav})
  }, [currentMealIsFav])

  return (
      <ScrollView>
        <Image source={{ uri: meal.imageUrl }} style={styles.image} />
        <View style={styles.additionalInfo}>
          <DefaultText>{meal.duration}m</DefaultText>
          <DefaultText>{meal.complexity.toUpperCase()}</DefaultText>
          <DefaultText>{meal.affordability.toUpperCase()}</DefaultText>
        </View>
        <View style={styles.container}>
        <Text style={styles.title}>Ingredients</Text>
        <View style={styles.list}>
          {meal.ingredients.map((ing) => (
            <ListItem key={ing} info={ing} />
          ))}
        </View>
        <Text style={styles.title}>Steps</Text>
        <View style={styles.list}>
          {meal.steps.map((step) => (
            <ListItem key={step} info={step} style={styles.stepStyle} />
          ))}
        </View>
        </View>
      </ScrollView>
    
  );
};

MealDetailScreen.navigationOptions = (navData) => {
  const mealTitle = navData.navigation.getParam("mealTitle");
  const isFav = navData.navigation.getParam('isFav');

  return {
    headerTitle: mealTitle,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Favorite"
          iconName={isFav ? "ios-star" : "ios-star-outline"}
          onPress={navData.navigation.getParam('toggleFav')}
        />
      </HeaderButtons>
    ),
  };
};

export default MealDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  additionalInfo: {
    flexDirection: 'row',
    justifyContent: "space-around",
    padding: 15,
    backgroundColor: "#ccc",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    marginVertical: 10,
  },
  stepStyle: {
    borderWidth: 2,
    borderColor: "#ccc",
    padding: 10,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  image: {
    width: "100%",
    height: 200,
  },
});

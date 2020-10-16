import React from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import MealListItem from '../components/mealListItem';

const MealList = ({navigation, categoryMeals}) => {

  const favMeals = useSelector(state => state.meals.favoriteMeals);

    const navigateToMealDetail = (itemData) => {
      const isCurrentMealFev = favMeals.some(meal => meal.id === itemData.item.id);
        navigation.navigate({
          routeName: "MealDetail",
          params: {
            mealId: itemData.item.id,
            mealTitle: itemData.item.title,
            isFav: isCurrentMealFev
          },
        });
      };

    const renderItems = (itemData) => {
        return (
          <MealListItem
            imageUrl={itemData.item.imageUrl}
            affordability={itemData.item.affordability}
            complexity={itemData.item.complexity}
            duration={itemData.item.duration}
            title={itemData.item.title}
            onPress={navigateToMealDetail.bind(this, itemData)}
          />
        );
      };

    return <FlatList style={{width: '100%'}} data={categoryMeals} renderItem={renderItems} />;
}

export default MealList;
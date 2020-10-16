import React from "react";
import {
  FlatList,
  StyleSheet,
} from "react-native";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { CATEGORIES } from "../data/dummy-data";
import CategoryListItem from '../components/categoryListItem';
import HeaderButton from '../components/headerButton';

const CategoriesScreen = ({ navigation }) => {

  const navigateToMealList = renderItem => {
      navigation.navigate({
        routeName: "MealList",
        params: {
          categoryId: renderItem.item.id
        },
      });
  }

  const renderItem = (renderItem) => {
    return <CategoryListItem title={renderItem.item.title} color={renderItem.item.color} onPress={navigateToMealList.bind(this, renderItem)} />;
  };
  return (
    <FlatList
      keyExtractor={(item, index) => item.id}
      numColumns={2}
      data={CATEGORIES}
      renderItem={renderItem}
    />
  );
};

CategoriesScreen.navigationOptions = ({navigation}) => {
    
  return {
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="MENU" iconName="ios-menu" onPress={() => {
            navigation.toggleDrawer();
        }} />
      </HeaderButtons>
    )
  };
};

export default CategoriesScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

import { MEALS } from '../../data/dummy-data';
import { TOGGLE_FAVORTIE, SAVE_FILTERS } from '../actions/actions';

const initialState = {
    meals: MEALS,
    filteredMeals: MEALS,
    favoriteMeals: [],
}

const mealReducer = (state = initialState, action) => {
    switch(action.type) {
        case TOGGLE_FAVORTIE:
            const matchedId = state.favoriteMeals.findIndex(meal => meal.id === action.mealId);
            if(matchedId >= 0 ) {
                const updatedFavMeals = [...state.favoriteMeals]
                updatedFavMeals.splice(matchedId, 1);
                return {
                    ...state,
                    favoriteMeals: updatedFavMeals,
                }
            } else {
                const newFavMeal = state.meals.find(meal => meal.id === action.mealId);
                return {
                    ...state,
                    favoriteMeals: state.favoriteMeals.concat(newFavMeal)
                }
            }
            case SAVE_FILTERS:
                const savedFilters = action.filters;
                const updatedFilteredMeals = state.meals.filter(meal => {
                    if(savedFilters.isGlutenFree && !meal.isGlutenFree) {
                        return false;
                    }
                    if(savedFilters.isLactoseFree && !meal.isLactoseFree) {
                        return false;
                    }
                    if(savedFilters.isVegetarian && !meal.isVegetarian) {
                        return false;
                    }
                    if(savedFilters.isVegan && !meal.isVegan) {
                        return false;
                    }
                    return true;
                });
                return {
                    ...state,
                    filteredMeals: updatedFilteredMeals,
                }
            default:
                return state;
    }
}

export default mealReducer;
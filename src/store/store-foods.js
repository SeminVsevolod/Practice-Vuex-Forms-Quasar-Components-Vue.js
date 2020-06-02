import Vue from 'vue';
import { uid } from 'quasar';

const state = {
  foods: [
    {
      id: 1,
      name: 'Burger',
      description: 'A burger is a sandwich consisting of one or more cooked patties of ground meat, usually beef, placed inside a sliced bread roll or bun.',
      imageUrl: 'https://www.burgerking.com.tr/cmsfiles/products/whopper.png',
      rating: 4
    },
    {
      id: 2,
      name: 'Pizza',
      description: 'Pizza is a savory dish of Italian origin, consisting of a usually round, flattened base of leavened wheat-based dough.',
      imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/71Wl7x1MrsL.jpg',
      rating: 5
    },
    {
      id: 3,
      name: 'Sprouts',
      description: 'The Brussels sprout is a member of the Gemmifera Group of cabbages, grown for its edible buds.',
      imageUrl: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/keto-brussel-sprouts-1573760364.jpg',
      rating: 1
    }
  ],
};

const mutations = {
  /**
   * Update food object
   * @param state
   * @param id - unique id of food object needed to update
   * @param updates - new food object
   */
  updateFood(state, {id, updates}) {
    const foodForUpdateIndex = state.foods.findIndex(food => food.id === id);
    Vue.set(state.foods, foodForUpdateIndex, updates);
  },

  /**
   * Delete food object
   * @param state
   * @param payload
   */
  deleteFood(state, payload) {
    state.foods = state.foods.filter(food => food.id !== payload.id);
  },

  /**
   * Add new food object
   * @param state
   * @param food
   */
  addFood(state, food) {
    Vue.set(state.foods, state.foods.length, food);
  },
};

const actions = {
  updateFood({ commit }, payload) {
    commit('updateFood', payload);
  },

  deleteFood({ commit }, payload) {
    commit('deleteFood', payload);
  },

  addFood({ commit }, food) {
    const foodId = uid();
    const payload = {
      id: foodId,
      ...food,
    };
    commit('addFood', payload);
  },
};

const getters = {
  foods: (state) => state.foods,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

import Vue from 'vue';
import { uid } from 'quasar';

const state = {
  foods: [
    {
      id: 1,
      name: 'Burger',
      description: 'A burger is a sandwich consisting of one or more cooked patties of ground meat, usually beef, placed inside a sliced bread roll or bun.',
      imageUrl: 'https://i.imgur.com/0umadnY.jpg',
      rating: 4
    },
    {
      id: 2,
      name: 'Pizza',
      description: 'Pizza is a savory dish of Italian origin, consisting of a usually round, flattened base of leavened wheat-based dough.',
      imageUrl: 'https://i.imgur.com/b9zDbyb.jpg',
      rating: 5
    },
    {
      id: 3,
      name: 'Sprouts',
      description: 'The Brussels sprout is a member of the Gemmifera Group of cabbages, grown for its edible buds.',
      imageUrl: 'https://i.imgur.com/RbKjUjB.jpg',
      rating: 1
    }
  ],
};

const mutations = {
  updateFood(State, payload) {
    Object.assign(State.foods[payload.id], payload.updates);
  },
  deleteFood(State, payload) {
    Vue.delete(State.foods, payload.id);
  },
  addFood(State, payload) {
    Vue.set(State.foods, payload.id, payload.food);
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
      food,
    };
    commit('addFood', payload);
  },
};

const getters = {
  foods: (State) => State.foods,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

require('./bootstrap');

import { createApp } from 'vue'
import { createStore } from 'vuex'

import PuzzleBase from './components/PuzzleBase'

const store = createStore({
  state() {
    return {
      answers: [],
      results: [],
    }
  },
  mutations: {

  },
  actions: {

  }
})

const app = createApp({
  components: {
    PuzzleBase
  }
})

app.use(store)
app.mount('#app');

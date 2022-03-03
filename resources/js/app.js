require('./bootstrap');

import {createApp} from 'vue'
import {createStore} from 'vuex'

import PuzzleBase from './components/PuzzleBase'
import Word from './word.js'

const store = createStore({
  state() {
    return {
      answers: [[]],
      currentRow: 0,
    }
  },
  // getters: {
  //   currentAnswers(state) {
  //     return state.answers[state.answers.length] || []
  //   }
  // },
  mutations: {
    addWord(state, payload) {
      // if (Array.isArray(state.answers[state.currentRow])) {
        state.answers[state.currentRow].push(payload)
      // } else {
      //   state.answers[state.currentRow] = [payload]
      // }
    },
    deleteWord(state) {
      // state.answers[state.currentRow].pop()
      state.answers[state.currentRow].pop()
    },
    incrementCurrentRow(state) {
      console.log('increment', state.currentRow);
      state.currentRow++
      state.answers[state.currentRow] = []
    }
  },
  actions: {
    clickButton(context, payload) {
      let currentAnswers = context.state.answers[context.state.currentRow]
      if (currentAnswers && currentAnswers.length >= 5) {
        return
      }

      context.commit('addWord', new Word(payload.key, 'draft'))
    },
    deleteWord(context) {
      if (context.state.answers[context.state.currentRow] <= 0) {
        return
      }

      context.commit('deleteWord')
    },
    enterRow(context) {
      if (context.state.answers[context.state.currentRow].length !== 5) {
        return
      }

      if (context.state.currentRow > 5) {
        return
      }

      context.commit('incrementCurrentRow')

      if (context.state.currentRow > 5) {
        console.log('You are done!');
      }
    }
  },
})

const app = createApp({
  components: {
    PuzzleBase
  }
})

app.use(store)
app.mount('#app');

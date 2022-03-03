import Checker from "./checker";

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
      message: '',
      gameStatus: ''
    }
  },
  mutations: {
    addAnswer(state, payload) {
      state.answers[state.currentRow].push(payload)
    },
    deleteAnswer(state) {
      state.answers[state.currentRow].pop()
    },
    updateAnswer(state, payload) {
      state.answers[state.currentRow] = payload
    },
    incrementCurrentRow(state) {
      console.log('increment', state.currentRow);
      state.currentRow++
      state.answers[state.currentRow] = []
    },
    updateMessage(state, payload) {
      state.message = payload
    },
    updateGameStatus(state, payload) {
      state.gameStatus = payload
    },
  },
  actions: {
    clickButton(context, payload) {
      if (context.state.gameStatus) {
        return
      }
      let currentAnswers = context.state.answers[context.state.currentRow]
      if (currentAnswers && currentAnswers.length >= 5) {
        return
      }

      context.commit('addAnswer', new Word(payload.key, 'draft'))
    },
    deleteAnswer(context) {
      if (context.state.gameStatus) {
        return
      }
      if (context.state.answers[context.state.currentRow] <= 0) {
        return
      }
      context.commit('deleteAnswer')
    },
    enterRow(context) {
      if (context.state.gameStatus) {
        return
      }
      if (context.state.answers[context.state.currentRow].length !== 5) {
        return
      }

      let checker = new Checker(context.state.answers[context.state.currentRow])
      if (!checker.isValidWord()) {
        context.commit('updateMessage', 'Not in word list')
        setTimeout(() => {
          context.commit('updateMessage', '')
        }, 1000)
        return false;
      }

      let results = checker.getResults()
      console.log(results);
      context.commit('updateAnswer', results)
      context.commit('incrementCurrentRow')

      if (checker.isCleared()) {
        context.commit('updateMessage', 'Great!')
        setTimeout(() => {
          context.commit('updateMessage', '')
        }, 1000)

        context.commit('updateGameStatus', 'Complete')

        return;
      }

      if (context.state.currentRow > 5) {
        context.commit('updateGameStatus', 'Failed')
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

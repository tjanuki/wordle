import Checker from "./checker";

import {createStore} from 'vuex'

import Word from './word.js'

const store = createStore({
  state() {
    return {
      answers: [[]],
      answer: '',
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
      state.answers[state.currentRow][payload.index] = payload.word
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
      if (context.state.answers[context.state.currentRow].length >= 5) {
        return
      }

      context.commit('addAnswer', new Word(payload.key.toLowerCase(), 'draft'))
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
      let results = checker.getResults()
      if (!checker.isValidWord()) {

        results.forEach((word, index) => {
          context.commit('updateAnswer', {index, word})
        })

        context.commit('updateMessage', 'Not in word list')
        context.commit('updateGameStatus', 'invalid')
        setTimeout(() => {
          context.commit('updateGameStatus', '')
        }, 600)
        setTimeout(() => {
          context.commit('updateMessage', '')
        }, 1000)

        return false;
      }

      results.forEach((word, index) => {
        setTimeout(() => {
          context.commit('updateAnswer', {index, word})
        }, 300 * index)
      })

      setTimeout(() => {

        if (checker.isCleared()) {
          results.forEach((word, index) => {
            setTimeout(() => {
              context.commit('updateAnswer', {
                index,
                word: new Word(word.word, 'completed')
              })
            }, 150 * index)
          })

          context.commit('updateMessage', 'Genius!')
          setTimeout(() => {
            context.commit('updateMessage', '')
          }, 3000)

          context.commit('updateGameStatus', 'Completed')

          return;
        }

        context.commit('incrementCurrentRow')
        if (context.state.currentRow > 5) {
          context.commit('updateMessage', context.state.answer)
          context.commit('updateGameStatus', 'Failed')
        }
      }, 1500)
    },
  },
})

export default store
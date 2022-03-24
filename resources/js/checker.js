import Word from './word'
import { dict } from './dict'

export default class Checker {
  constructor(answer, words) {
    this.answer = answer
    this.words = words
    this.results = []
  }

  getWord() {
    return this.words.map((item) => item.word).join('')
  }

  isValidWord() {
    return dict.includes(this.getWord())
  }

  isCleared() {
    let exactAnswers = this.results.filter((result) => {
      return result.status === 'exact'
    })

    return exactAnswers.length === 5
  }

  getResults() {
    for (let i in this.words) {
      if (!this.isValidWord()) {
        this.results.push(new Word(this.words[i].word, 'checked'))
        continue
      }

      if (this.words[i].word === this.answer.substr(i, 1)) {
        this.results.push(new Word(this.words[i].word, 'exact'))
        continue
      }

      if (this.answer.indexOf(this.words[i].word) > -1) {
        this.results.push(new Word(this.words[i].word, 'used'))
        continue
      }

      this.results.push(new Word(this.words[i].word, 'invalid'))
    }

    return this.results
  }
}
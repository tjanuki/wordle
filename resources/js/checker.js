import Word from "./word";

export default class Checker {
  constructor(words) {
    this.answer = 'HAPPY'
    this.words = words
  }

  getWord() {
    return this.words.map((item) => item.word).join('').toUpperCase()
  }

  isValidWord() {
    return words.includes(this.getWord())
  }

  getResults() {
    let results = []
    for (let i in this.words) {
      // console.log('answer', this.answer.substr(i, 1));
      if (this.words[i].word === this.answer.substr(i, 1)) {
        // console.log(this.words[i].word, 'exact');
        results.push(new Word(this.words[i].word, 'exact'))
        continue;
      }

      if (this.answer.indexOf(this.words[i].word) > 0) {
        console.log(this.words[i].word, 'used');
        results.push(new Word(this.words[i].word, 'used'))
        continue;
      }

      // console.log(this.words[i].word, 'unknown');
      // results.push('invalid')
      results.push(new Word(this.words[i].word, 'invalid'))
    }

    return results;
  }
}

const words = [
  'HAPPY',
  'HELLO',
  'PUPPY',
  'AUDIO',
  'UNDER',
  'SUNNY',
  'KITTY',
  'APPLE'
]
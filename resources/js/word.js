export default class Word {
  constructor(word = '', status = '') {
    this.word = word;
    this.status = status;
  }

  isEmpty() {
    return ! this.word
  }

  isDraft() {
    return this.status === 'draft'
  }
}



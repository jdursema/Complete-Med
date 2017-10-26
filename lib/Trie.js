import Node from '../lib/Node.js';

export default class Trie {
  constructor() {
    this.root = new Node (''); 
    this.count = 0; 
  }

  insert(word) {

    let letters = word.toLowerCase().split('');
   
    let currentNode = this.root;


    letters.forEach((letter) => {
      if (!currentNode.child[letter]) {
        currentNode.child[letter] = new Node (letter);

      }
      currentNode = currentNode.child[letter];
   
    });


    if (!currentNode.endWord) {
      this.count ++;
      currentNode.endWord = true;
    }

  }



  suggest(phrase) {
    phrase = phrase.toLowerCase().split('');

    let currentNode = this.root;

    phrase.forEach(letter => {
      currentNode = currentNode.child[letter];
    });

    if (!currentNode || !currentNode.child) { 
      return [];

    } else {
      return this.findSuggestions(currentNode, phrase.join(''));
    }

  }


  findSuggestions(currentNode, phrase, suggestions = []) {

    let childrenLetters = Object.keys(currentNode.child);


    childrenLetters.forEach(childLetter => {

      let letterNode = currentNode.child[childLetter];
      let newPhrase = phrase + childLetter;


      if (letterNode.endWord) {
        suggestions.push({word: newPhrase, popCount: letterNode.popularity});
      } 
      return this.findSuggestions(letterNode, newPhrase, suggestions);
    });

    suggestions.sort((a, b) => {
      return b.popCount - a.popCount;
    });
      
    return suggestions.map(newWord => { 
      return newWord.word; 
    });

  }

  select(word) {
    let currentNode = this.root;

    word = word.split('');

    word.forEach(letter => {
      currentNode = currentNode.child[letter];
    });

    currentNode.popularity++;
  }  



  totalWords() {
    return this.count;
  }

  populate(list) {
    list.forEach((word) => {
      this.insert(word);
    });

  }

}
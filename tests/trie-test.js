import {expect} from 'chai';

import node from '../lib/Node.js';
import Trie from '../lib/Trie.js';

const fs = require('fs');
const text = "/usr/share/dict/words";
const dictionary = fs.readFileSync(text).toString().trim().split('\n');

describe('Trie', () =>{

	it ('should be a thing', () =>{
		expect(Trie).to.exist;
	});

	it ('should be a function', () =>{
		
    expect(Trie).to.be.a('function')
	});

  it ('should have a root node with the letter value equal to an empty sting', () =>{
    
    const trie = new Trie();

    expect(trie.root.letter).to.equal('');
  });
});

describe('Insert', () => {

  it ('should have a function called insert',() =>{

    const trie = new Trie();
    expect(trie.insert).to.be.a('function');
    
  });

  it ('should be able to take in a word', () => {

    const trie = new Trie();

    trie.insert('pizza');
    expect(trie.root.child.p.child.i.child.z.child.z.child.a.letter).to.equal('a');
  });

  it ('should be able to take in multiple words', () =>{

    const trie = new Trie();

    trie.insert('cow');
    trie.insert('coward');
    trie.insert('coincidence');

    expect(trie.root.child.c.child.o.child.w.child.a.child.r.child.d.letter).to.equal('d');
    expect(trie.root.child.c.child.o.child.w.letter).to.equal('w');

  });

  it ('the word count should increase when a word is added', () =>{
    const trie = new Trie();

    trie.insert('cow');
    trie.insert('coward');
    trie.insert('coincidence');

    expect(trie.count).to.equal(3);


  });

  it ('should change the words last letters node property endWord to true when a word is inserted', () => {
    const trie = new Trie();

    trie.insert('pig');

    expect(trie.root.child.p.child.i.child.g.endWord).to.equal(true);

    expect(trie.root.child.p.child.i.endWord).to.equal(false);

    trie.insert('pi');

    expect(trie.root.child.p.child.i.endWord).to.equal(true);

  });

});


describe('Suggest', () => {

  it ('should have a function called suggest',() =>{

    const trie = new Trie();
    expect(trie.suggest).to.be.a('function');
    
  });

  it('should return an empty array if nothing is suggested', ()=>{
    const trie = new Trie();

    expect(trie.suggest('')).to.deep.equal([]);
  });

  it('should be able to suggest a word that has been inserted', () =>{
    const trie = new Trie();

    trie.insert('duck');


    expect(trie.suggest('du')).to.deep.equal(['duck']);

  });

  it ('should be able to suggest multiple words that have been inserted based on the phrase', () =>{
    const trie = new Trie();

    trie.insert('duck');
    trie.insert('dugout');
    trie.insert('duel');

    expect(trie.suggest('du')).to.deep.equal(['duck', 'dugout', 'duel']);
  });


  it ('should not suggest a word if it does not match any word in the trie', () =>{

    const trie = new Trie();

    trie.insert('duck');
    trie.insert('dugout');
    trie.insert('duel');

    expect(trie.suggest('dul')).to.deep.equal([]);
  });

  it ('should be able to find a match even if an uppercase letter is passed in', () =>{
    const trie = new Trie();

    trie.insert('duck');
    trie.insert('dugout');
    trie.insert('duel');

    expect(trie.suggest('D')).to.deep.equal(['duck', 'dugout', 'duel']);
  });

});


describe('Populate', () => {

  it ('should have a function called suggest',() =>{

    const trie = new Trie();
    expect(trie.populate).to.be.a('function');
    
  });

  it ('should be able to populate the trie with the dictionary',() => {
    const trie = new Trie();
    trie.populate(dictionary);

    expect(trie.count).to.equal(234371);
  });

  it ('should be able to suggest words based on the dictionary after the trie been populated by the dictionary', () =>{
    const trie = new Trie();
    trie.populate(dictionary);

    expect(trie.suggest('piz')).to.deep.equal(["pize", 'pizza', 'pizzeria', 'pizzicato', 'pizzle']);
  
  });

});

describe('Select', () => {
  it ('should have a function called suggest',() => {
    const trie = new Trie();

    expect(trie.select).to.be.a('function');
    
  });

  it ('should increase the last letter of a words node if the word is selected', () => {
    const trie = new Trie();
    
    trie.insert('chicken');
    trie.insert('chick');
    trie.insert('chill');

    expect(trie.root.child.c.child.h.child.i.child.l.child.l.popularity).to.equal(0)

    trie.select('chill');

    expect(trie.root.child.c.child.h.child.i.child.l.child.l.popularity).to.equal(1)

  });

  it ('should increase the letter nodes popularity based on how many times it was selected', () =>{
    const trie = new Trie();
    
    trie.insert('chicken');
    trie.insert('chick');
    trie.insert('chill');

    trie.select('chill');
    trie.select('chill');
    trie.select('chill');

    expect(trie.root.child.c.child.h.child.i.child.l.child.l.popularity).to.equal(3)
  })

  it ('should sort the suggestions based on how many times the word was selected', () =>{
    const trie = new Trie();
    
    trie.insert('chicken');
    trie.insert('chick');
    trie.insert('chill'); 

    trie.select('chill');
    trie.select('chill');
    trie.select('chill');

    trie.select('chicken');
    trie.select('chicken');

    expect(trie.suggest('chi')).to.deep.equal(['chill', 'chicken', 'chick']);


  })

});
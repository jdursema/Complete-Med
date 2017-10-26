import {expect} from 'chai';

import node from '../lib/Node.js';
// import trie from '../lib/Trie.js';


describe('Node', () =>{

	it ('should be a thing', () =>{
		expect(node).to.exist;
	})


	it ('should be a function', () =>{
		expect(node).to.be.a('function')
	});

	
})
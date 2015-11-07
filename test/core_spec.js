import {expect} from 'chai';
import {List, Map, fromJS} from 'immutable';

import {setEntries, next, vote} from '../src/core';

describe('application logic', () => {
  describe('setEntries', () => {
    it('adds the entries to the state', () => {
      const state = Map();
      const entries = List.of('Matrix', 'Hitch');
      const nextState = setEntries(state, entries);
      expect(nextState).to.equal(Map({
        entries: List.of('Matrix', 'Hitch')
      }));
    });
  });
  describe('next', () => {
    it('takes the next 2 entries under vote', () => {
      const state = Map({
        entries: List.of('Matrix', 'Hitch', 'Serendipity')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Matrix', 'Hitch')
        }),
        entries: List.of('Serendipity')
      }));
    });
  });
  const moviePair = ['Matrix', 'Hitch'];

  describe('vote', () => {
    it('creates a tally for the voted entry', () => {
      const state = fromJS({
        vote: {
          pair: moviePair
        },
        entries: []
      });
      const nextState = vote(state, 'Matrix');
      expect(nextState).to.equal(fromJS({
        vote: {
          pair: moviePair,
          tally: {Matrix: 1}
        },
        entries: []
      }));
    });
    it('adds to existing tally for voted entry', () => {
      const state = fromJS({
        vote: {
          pair: moviePair,
          tally: {Matrix: 2, Hitch: 1}
        },
        entries: []
      });
      const nextState = vote(state, 'Matrix');
      expect(nextState).to.equal(fromJS({
        vote: {
          pair: moviePair,
          tally: {Matrix: 3, Hitch: 1}
        },
        entries: []
      }));
    });
  });

});

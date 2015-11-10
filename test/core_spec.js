import {expect} from 'chai';
import {List, Map, fromJS} from 'immutable';
import assert from 'assert';
import {setEntries, next, vote} from '../src/core';
console.log(new Date());
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
  const moviePair = ['Matrix', 'Hitch'];
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

    it('puts winner of current vote back to entries', () => {
      const state = fromJS({
        vote: {
          pair: moviePair,
          tally: {
            Matrix: 4,
            Hitch: 7
          }
        },
        entries: ['Sunshine', 'Millions', '127 hours']
      });
      const nextState = next(state);
      expect(nextState).to.equal(fromJS({
        vote: {
          pair: ['Sunshine', 'Millions']
        },
        entries: ['127 hours', 'Hitch']
      }));
    });
    it('puts both from tied vote back to entries', () => {
      const state = fromJS({
        vote: {
          pair: moviePair,
          tally: {
            Matrix: 4,
            Hitch: 4
          }
        },
        entries: ['Sunshine', 'Millions', '127 hours']
      });
      const nextState = next(state);
      // expect(true).to.equal(false, 'paradox');
      assert.is(nextState, fromJS({
        vote: {
          pair: ['Sunshine', 'Millions']
        },
        entries: ['127 hours', 'Matrix', 'Hitch']
      }), 'It did not handle tied votes properly');
    });

    it('should mark the winner when just one entry left', () => {
      const state = fromJS({
        vote: {
          pair: moviePair,
          tally: {
            Matrix: 4,
            Hitch: 2
          }
        },
        entries: []
      });
      const nextState = next(state);
      assert.is(nextState, fromJS({
        winner: 'Matrix'
      }));
    });

  });

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

import React from 'react';
import classNames from 'classnames';

export default React.createClass({
  propTypes: {
    pair: React.PropTypes.array,
    hasVoted: React.PropTypes.string
  },
  getPair() {
    return this.props.pair || [];
  },
  isDisabled() {
    return !!this.props.hasVoted;
  },
  hasVotedFor: function(entry) {
    return this.props.hasVoted === entry;
  },
  render() {
    return <div className="voting">
      {this.getPair().map((entry) =>
        <button
          key={entry}
          className={classNames({voted: this.hasVotedFor(entry)})}
          onClick={() => this.props.vote(entry)}
          disabled={this.isDisabled()}
        >
          <h1>{entry}</h1>
        </button>
      )}
    </div>;
  }
});

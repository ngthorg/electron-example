import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DocumentMeta from 'react-document-meta';
import * as CounterActions from 'universal/actions/counter';
import { pushPath } from 'redux-simple-router';


const meta = { title: 'Home' };

class Home extends React.Component {

  static propTypes = {
    counter: PropTypes.object.isRequired,
    decrement: PropTypes.func.isRequired,
    increment: PropTypes.func.isRequired,
    incrementAsync: PropTypes.func.isRequired,
    incrementIfOdd: PropTypes.func.isRequired,
    pushPath: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      usernameGithub: ''
    };
  }

  getInputValue() {
    return findDOMNode(this.refs.usernameGithub).value;
  }

  handleKeyUp(e) {
    if (e.keyCode === 13) {
      this.handleGoClick();
    }
  }

  handleOnChange() {
    this.setState({
      usernameGithub: this.getInputValue()
    });
  }

  handleGoClick() {
    this.props.pushPath(`/user/${this.getInputValue()}`);
  }

  render() {
    const { counter, decrement, increment, incrementAsync, incrementIfOdd } = this.props;

    return (
      <div className="container">
        <DocumentMeta {...meta} />
        <h2>Home</h2>
        <p>Clicked: {counter.get('clicked')} times</p>
        <p className="list-button">
          <button type="button" onClick={increment} className="btn btn-primary-outline btn-sm">+</button>
          <button type="button" onClick={decrement} className="btn btn-danger-outline btn-sm">-</button>
          <button type="button" onClick={incrementIfOdd} className="btn btn-info-outline btn-sm">Increment if odd</button>
          <button type="button" onClick={() => incrementAsync()} className="btn btn-success-outline btn-sm">Increment async</button>
        </p>

        <div className="input-group">
          <input
            className="form-control"
            ref="usernameGithub"
            autoFocus
            onKeyUp={this.handleKeyUp.bind(this)}
            onChange={this.handleOnChange.bind(this)}
            value={this.state.usernameGithub}
            placeholder="github/username"
          />
          <span className="input-group-btn">
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.handleGoClick.bind(this)} >
              Go!
            </button>
          </span>
        </div>
        <p/>
      </div>
    );
  }

}


function mapStateToProps(state) {
  return {
    counter: state.counter,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(CounterActions, dispatch),
    pushPath: (url) => dispatch(pushPath(url))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

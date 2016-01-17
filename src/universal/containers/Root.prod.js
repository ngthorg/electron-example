import React, { PropTypes } from 'react';
import { Router, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import routers from 'universal/routers';


export default class Root extends React.Component {

  static propTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    const { store } = this.props;

    return (
      <Provider store={store}>
        <Router history={hashHistory} children={routers(store)} />
      </Provider>
    );
  }

}

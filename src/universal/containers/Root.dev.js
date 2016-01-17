import React, { PropTypes } from 'react';
import { Router, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import routers from 'universal/routers';
import DevTools from 'universal/containers/DevTools';


export default class Root extends React.Component {

  static propTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    const { store } = this.props;

    return (
      <Provider store={store}>
        <div>
          <Router history={hashHistory} children={routers(store)} />
          <DevTools />
        </div>
      </Provider>
    );
  }

}

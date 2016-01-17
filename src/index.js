import 'babel-polyfill';
import 'stylesheets/main';
import React from 'react';
import { render } from 'react-dom';
import { hashHistory } from 'react-router';
import { syncReduxAndRouter } from 'redux-simple-router';
import configureStore from 'universal/store/configureStore';
import Root from 'universal/containers/Root';


const store = configureStore();
syncReduxAndRouter(hashHistory, store);

render(
	<Root store={store} />
	, document.querySelector('#main')
);

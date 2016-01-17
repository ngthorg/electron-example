import { createStore, applyMiddleware, compose } from 'redux';
import { persistState } from 'redux-devtools';
import { fromJS } from 'immutable';
import createLogger from 'redux-logger';
import promiseMiddleware from 'universal/lib/promiseMiddleware';
import Reducers from 'universal/reducers';
import DevTools from 'universal/containers/DevTools';

const finalCreateStore = compose(
  applyMiddleware(promiseMiddleware, createLogger({
		// development using redux-logger with Immutable
		stateTransformer: (state) => {
			return fromJS(state).toJS();
		}
	})),
  DevTools.instrument(),
  persistState(
    window.location.href.match(
      /[?&]debug_session=([^&]+)\b/
    )
  )
)(createStore);

export default function configureStore(initialState) {
  const store = finalCreateStore(Reducers, initialState);

  if (module.hot) {
    module.hot.accept('universal/reducers', () =>
      store.replaceReducer(require('universal/reducers').default)
    );
  }

  return store;
}

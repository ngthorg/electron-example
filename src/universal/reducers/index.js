import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routeReducer } from 'redux-simple-router';
import counter from 'universal/reducers/counter';
import github from 'universal/reducers/github';


const rootReducer = combineReducers({
	routing: routeReducer,
	form: formReducer,
	counter,
	github
});

export default rootReducer;

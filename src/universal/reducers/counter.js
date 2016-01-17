import {
	INCREMENT_COUNTER
	, DECREMENT_COUNTER
} from 'universal/actions/actionsTypes';
import { fromJS } from 'immutable';


const initialState = fromJS({
	clicked: 0
});

export default function counter(state = initialState, action) {
  switch (action.type) {
    case INCREMENT_COUNTER:
			new Notification('increment', {
				body: `increment counter ${state.get('clicked')}`,
				sound: true
			});
			return state.update('clicked', val => val + 1);
    case DECREMENT_COUNTER:
			new Notification('decrement', {
				body: `decrement counter ${state.get('clicked')}`,
				sound: true
			});
			return state.update('clicked', val => val - 1);
    default:
      return state;
  }
}

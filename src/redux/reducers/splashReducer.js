import { CHECK_NETWORK } from '../constants';

const initialState = {
	defaultProps : 'demo',

};
const splashReducer = (state = initialState, action) => {
	switch(action.type) {
		case CHECK_NETWORK:
			return {
				...initialState,
				networkInfo: action.payload
				
			};
		default:
			return state;
	}
}
export default splashReducer;

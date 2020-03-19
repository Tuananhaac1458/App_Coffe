import { createStore, combineReducers } from 'redux';
import pageListReducer from './reducers/pageListReducer';
import splashReducer from './reducers/splashReducer';
import getOderDetail from './reducers/getOderDetail';
import getDataProductLove from './reducers/loveProduct';

import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const rootReducer = combineReducers(
	{ 
		pageList: pageListReducer,
		gateProps: splashReducer,
		oderDetail: getOderDetail,
		dataProductLove: getDataProductLove
	}
);
const configureStore = () => {
	return createStore(rootReducer, applyMiddleware(thunk));
}
export default configureStore;


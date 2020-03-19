import { SET_LOVEPRODUCT } from '../constants';

import { GetAllProduct  } from '../actions/OderDetail'

const initialState = GetAllProduct('love');

const getDataProductLove = (state = initialState, action) => {
	switch(action.type) {
		case SET_LOVEPRODUCT:
			// dataOder.push({
			// 	...action.payload,
			// })
			// console.log("GET_OERDETAIL", dataOder)
				console.log('SET_LOVEPRODUCT==>',action.payload)		
			return [
				...action.payload,
			];
		default:
			return [
				...state
			];
	}
}
export default getDataProductLove;
import { SET_ODERDETAIL, GET_OERDETAIL } from '../constants';


const initialState = [];

const getOderDetail = (state = initialState, action) => {
	switch(action.type) {
		case GET_OERDETAIL:
			// dataOder.push({
			// 	...action.payload,
			// })
			// console.log("GET_OERDETAIL", dataOder)
			return [
				...action.payload,
			];
		default:
			return state;
	}
}


export default getOderDetail;

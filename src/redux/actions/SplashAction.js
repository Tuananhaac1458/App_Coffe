import { CHECK_NETWORK } from '../constants';
import NetInfo from "@react-native-community/netinfo";


export function setDataProps(state) {
	return {
		type: CHECK_NETWORK,
		payload: state,
	};
}


export function getDataProps() {
	return async (dispatch) => {
		try {
			const network = await NetInfo.addEventListener(state => {
				 return dispatch(setDataProps({
				 	type:state.type,
				 	Isconnected:state.isConnected
				 }));

			});

			// 	method: 'GET'
			// })
			// .then((response) => response.json())
   //  		.then((responseJson) => {
   //  			return responseJson.data
		 //    });
			// await dispatch(setPageList(apiReq));
			// return apiReq || [];

		} catch (error) {
			console.error(error);
		}
	};
}


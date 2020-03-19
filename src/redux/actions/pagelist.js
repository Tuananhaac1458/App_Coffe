import { GET_PAGE_LIST } from '../constants';
import { getPageList1 } from '../../helpers/ApiClient';

export function setPageList(pageList) {
	return {
		type: GET_PAGE_LIST,
		payload: pageList || [],
	};
}

export function getPageList() {
	return async (dispatch) => {
		try {
				const apiReq = await fetch('http://dummy.restapiexample.com/api/v1/employees', {
				method: 'GET'
			})
			.then((response) => response.json())
    		.then((responseJson) => {
    			return responseJson.data
		    });
			await dispatch(setPageList(apiReq));
			return apiReq || [];

		} catch (error) {
			console.error(error);
		}
	};
}


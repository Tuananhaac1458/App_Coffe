import { 
	LOGIN, 
	LOGIN_CALLBACK, 
	LOGOUT, 
	LOGOUT_CALLBACK 
} from '../constants';

export function login(iObj) {
  return {
    types: [LOGIN, LOGIN_CALLBACK, LOGIN_CALLBACK],
    promise: (client) => client.post('/api/auth/login', {
      // data: {
      //   email: iObj.username,
      //   password: iObj.password
      // },
      // headers: {
      //   expire: 0,
      // }
    }).then(result => {
      if (result.status === 'success') {
        // store user and pass
        saveInfoUser(client, result.data)
        //sessionStorage.clear();
        return result;
      }
      return result;
    })
  };
}
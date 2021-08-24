import {site} from '$config/site'
import { getCookie } from '$util/cookie';

// get jwt token
export async function getToken(username, password,captchaKey) {
		let url = site.server_login;
		console.log(url);
		let data = {
			"username": username,
			"password": password,
			"captchaKey": captchaKey
		};
		let headers = {
			"Content-Type": "application/json"
		};
		let options = {
			method: 'POST',
			headers: headers,
			body: JSON.stringify(data)
		};
		let response = await fetch(url, options);
		
		return await (response).json();
}

export async function isUserLoggedIn(){
	let cookie = getCookie('token');
	if(cookie)
		return cookie.length >= 63;
	else
		return false
}
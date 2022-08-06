
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { fetchJSON } from './util';
import { site } from '$config/site'
import { getCookie } from '$util/cookie'
import { isUserLoggedIn } from './auth';

export async function getInfo() {
	let user = await getUserInfo();
	if(!user)
		return undefined;
	let avatar = await getAvatar();
	return {
		user: user,
		avatar: avatar
	}
}
export async function requestData() {
	if (!isUserLoggedIn()) {
		return null;
	}
	let url = site.server_user;
	let headers = {
		"Content-Type": "application/json",
		"Authorization": "Bearer " + getCookie("token")
	};
	let options = {
		method: 'GET',
		headers: headers,
	};
	let output =  await fetchJSON(url,options);
	return output.user;
}
export async function getAvatar() {
	let avatar = window.localStorage.getItem('userAvatar');
	let user = await getUserInfo();
	
	if(!avatar){
		avatar =  "https://crafatar.com/avatars/" + await getUID(user.nick)+'?default=MHF_Steve&overlay=true';	
		window.localStorage.setItem('userAvatar',avatar);
	}
	return avatar;
}
export async function getUserInfo() {
	let user = JSON.parse(window.localStorage.getItem('userInfo'));
	if(!user || user == null){
		user = await requestData();
		if(user == null)
			return;
		window.localStorage.setItem('userInfo',JSON.stringify(user));
	}
	return user;
}
export async function getUID(nick){
	let options = {
		method: 'GET',
		headers: {
			"Content-Type": "text/plain"
		}
	}
	return await (await fetch(site.server_uid+""+nick,options)).text()
}

export async function isSessionActive(){
	const site_validate = site.server_validate;
	const token = getCookie('token');

	const options =  {
		method: 'POST',
		headers: {
			"Content-Type": "text/plain",
			"Authorization": "Bearer " + token
		},
		body: ''
	}
	let response = await (await fetch(site_validate,options)).text();
	response = response.toLowerCase();
	return response === "true";
}

export async function addUserInfo(field, value) {
	let user = await getUserInfo()
	user[field] += value
	let json = await JSON.stringify(user)
	window.localStorage.setItem('userInfo',json)
}

// --- Panel Methods ---

export async function loginUser() {
	let options = {
		method: 'GET',
		  headers: {
			  'Authorization': 'Bearer '+ getCookie('token')
		  }
	  }
	  
	  fetch(site.site_api+'server-login',options)
}
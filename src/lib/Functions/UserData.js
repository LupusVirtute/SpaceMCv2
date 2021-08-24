import site from '$config/site'

export async function getUserInfo(nick) {
	const options = {
		method: 'GET'
	}
	const response = await fetch(site.server_user+'/'+nick,options);
	const json = await response.json();
	return json;
}
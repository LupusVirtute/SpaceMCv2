export function getCookie(cName) {
	const name = cName + "=";
	const cDecoded = decodeURIComponent(document.cookie); //to be careful
	const cArr = cDecoded .split('; ');
	let res = undefined;
	cArr.forEach(val => {
		if (val.indexOf(name) === 0) res = val.substring(name.length);
	})
	return res;
}
// Set cookie
export function setCookie(cName,value) {
	const expireDate = new Date();
	expireDate.setDate(expireDate.getDate() + 365*7);
	document.cookie = cName + "="+value+"; SameSite=Lax; path=/; expires=" + expireDate.toUTCString()+'; Secure';
}
export function eraseCookie(name) {   
    document.cookie = name+'=; Max-Age=-99999999; path=/;';  
}
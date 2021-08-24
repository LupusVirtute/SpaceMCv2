export async function fetchJSON(endpoint,options) {
  let response = await fetch(endpoint,options);
  let json = await response.json();
  return json;
}
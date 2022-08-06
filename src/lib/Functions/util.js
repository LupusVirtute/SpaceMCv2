import { writable } from "svelte/store";

export async function fetchJSON(endpoint,options) {
  let response = await fetch(endpoint,options);
  let json = await response.json();
  return json;
}
export async function fetchText(endpoint, options) {
	const response = await fetch(endpoint,options)
	const text = await response.text();
	return text
}
export const points = writable(0);
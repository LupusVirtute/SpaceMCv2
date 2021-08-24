import { pRateLimit } from 'p-ratelimit';
const limit = pRateLimit({
    interval: 5000,             // 1000 ms == 1 second
    rate: 3,                   // 30 API calls per interval
    concurrency: 10            // no more than 10 running at once
});

export async function rateLimit(fn,arg) {
	try {
		return await limit(()=>fn(arg))
	} catch(error) {
		console.log(error);
		return {
			status: 429,
			body: {
				message: "CONNECTION_LIMIT"
			}
		}
	}
}

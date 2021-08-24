import { sha256 } from "js-sha256";
import { PrismaClient } from '@prisma/client';
// const { PrismaClient } = pkg;
export const prisma = new PrismaClient();


export async function getUserSession(sessionId: string) {
	let session;
	try {
	session = await prisma.sessions.findFirst({
		where: { 
			session: sessionId,
		}
	})
	}
	catch(err) {
		console.log(err);
	}
	return session
}
async function getUserSessionFromUserName(username: string) {
	const user = await prisma.sessions.findFirst({
		where: {
			login: username
		}
	})
	return user
}
export async function createUserSession(login: string,password: string) {
	const authmeUser = await prisma.authme.findFirst({
		where: {
			username: login
		}
	})
	const array = authmeUser.password.split('$')

	const salt = array[2]
	
	const hash = sha256(sha256(password) + salt)
	
	const hashedPassword = array[3]

	if(hashedPassword == hash){
		const user = await getUserSessionFromUserName(login)
		let session
		if(user){
			session = await prisma.sessions.update({
				where: {
					id: user.id
				},
				data: {
					session: sha256(Math.random().toString() + hash),
				}
			})
		}
		else {
			session = await prisma.sessions.create({
				data: {
					login: login,
					session: sha256(Math.random().toString() + hash),
				}
			})
		}
		return session
	}
	return {
		login: "ERROR",
		session: 'ERROR'
	}
}
export async function getUser(sessionID: string): Promise<User> {
	const sessionInfo = await getUserSession(sessionID)
	if(!sessionInfo)
		return null
	const player = await prisma.players.findFirst({
		where: {
			nick: sessionInfo.login
		}
	})
	return player as User
}
export async function getPlayer(nick: string) { 
	
	const player = await prisma.players.findFirst({
		where: {
			nick: nick
		},
		select: {
			nick: true,
			time: true,
			kills: true,
			deaths: true,
			ore: true,
			inviteAmount: true
		}
	})
	const additionalPlayerInfo = await prisma.authme.findFirst({
		where: {
			username: nick
		}
	})
	let registerDate = additionalPlayerInfo.regdate;
	player.registerDate = registerDate.toString();
	return player
}


export async function getTokenFromRequest(request) { 
	const token = request.headers['authorization'];
	if(!token)
		return null;
	if(token.length != 71)
		return null;
	return token.split('Bearer ').pop();
}

export async function addInvite(invitedNick: string, inviterNick: string, inviteAmount: number) {
	await prisma.players.update({
		where: {
			nick: invitedNick
		},
		data: {
			invited: true
		}
	})
	await prisma.players.update({
		where: {
			nick: inviterNick
		},
		data: {
			inviteAmount: inviteAmount+1
		}

	})
}
export async function isSameIPForPlayers(player1: string, player2: string) {
	player1 = player1.toLowerCase();
	player2 = player2.toLowerCase();
	
	const player1Info = await prisma.authme.findFirst({
		where: {
			username: player1
		}
	})
	const player2Info = await prisma.authme.findFirst({
		where: {
			username: player2
		}
	})
	return player1Info.ip === player2Info.ip
}

export async function getTopPlayers(topType) {
	let result = {};
	topType = topType.toLowerCase();
	switch(topType) {
		case 'ore':
			result = await prisma.players.findMany({
				take: 10
				orderBy: {
					ore: {
						count: 'asc'
					}
				}
			})
			break;
	
	}

	return result;
}


interface User {
	nick: string,
	uid: string,
	time: number,
	kills: number,
	deaths: number,
	ore: number,
	joinTime: number,
	invited: boolean,
	inviteAmount: number
}


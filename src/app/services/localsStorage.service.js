const TOKEN_KEY = 'jwt-token';
const REFRESH_KEY = 'jwt-refresh-token';
const EXOIRES_KEY = 'jwt-expires';
const USERID_KEY = 'user-local-id';

export function setTokens({
	refreshToken,
	idToken,
	expiresIn = 3600,
	localId,
}) {
	const expiresDate = new Date().getTime() + expiresIn * 1000;
	localStorage.setItem(USERID_KEY, localId);
	localStorage.setItem(TOKEN_KEY, idToken);
	localStorage.setItem(REFRESH_KEY, refreshToken);
	localStorage.setItem(EXOIRES_KEY, expiresDate);
}

export function getAccessTokens() {
	return localStorage.getItem(TOKEN_KEY);
}

export function getRefreshToken() {
	return localStorage.getItem(REFRESH_KEY);
}

export function getExpiresDate() {
	return localStorage.getItem(EXOIRES_KEY);
}
export function getUserId() {
	return localStorage.getItem(USERID_KEY);
}

const localsStorageService = {
	setTokens,
	getAccessTokens,
	getRefreshToken,
	getExpiresDate,
	getUserId,
};

export default localsStorageService;

import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import userService from '../services/user.service';
import { toast } from 'react-toastify';
import { setTokens } from '../services/localsStorage.service';

const httpAuth = axios.create();

const AuthContext = React.createContext();

export const useAuth = () => {
	return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
	const [currentUser, setUser] = useState({});
	const [error, setError] = useState(null);
	async function logIn({ email, password }) {
		try {
			const { data } = await httpAuth.post(
				`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`,
				{
					email,
					password,
					returnSecureToken: true,
				}
			);
			setTokens(data);
			console.log(data);
			await getUserData();
		} catch (error) {
			errorCatcher(error);
			const { code, message } = error.response.data.error;
			console.log(code, message);
			if (code === 400) {
				switch (message) {
					case 'INVALID_PASSWORD':
						throw new Error('Email или пароль введены некорректно');

					default:
						throw new Error(
							'Слишком много попыток входа. Попробуйте позже'
						);
				}
			}
		}
	}
	async function getUserData() {
		try {
			const { content } = await userService.getCurrentUser();
			setUser(content);
		} catch (error) {
			errorCatcher(error);
		}
	}

	async function singUp({ email, password, ...rest }) {
		const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`;
		try {
			const { data } = await httpAuth.post(url, {
				email,
				password,
				returnSecureToken: true,
			});
			setTokens(data);
			await createUser({ _id: data.localId, email, ...rest });
		} catch (error) {
			errorCatcher(error);
		}
	}
	async function createUser(data) {
		try {
			const { content } = userService.create(data);
			setUser(content);
		} catch (error) {
			errorCatcher(error);
			const { code, message } = error.response.data.error;
			if (code === 400) {
				if (message === 'EMAIL_EXISTS') {
					const errorObject = {
						email: 'Пользователь с таким email уже существует',
					};
					throw errorObject;
				}
			}
		}
	}
	function errorCatcher(error) {
		const { message } = error.response.data;
		setError(message);
	}
	useEffect(() => {
		if (error !== null) {
			toast(error);
			setError(null);
		}
	}, [error]);
	return (
		<AuthContext.Provider value={{ singUp, currentUser, logIn }}>
			{children}
		</AuthContext.Provider>
	);
};

AuthProvider.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]),
};

export default AuthProvider;

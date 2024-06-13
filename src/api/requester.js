import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
export const BASE_URL = import.meta.env.VITE_BASE_URL;

const versionApi = '/api/v1';

export const requester = axios.create({ baseURL: BASE_URL + versionApi });

requester.interceptors.request.use(async config => {
	return config;
});

requester.interceptors.response.use(
	async config => {
		if (config.config.method.toLowerCase() !== 'get') {
			if (config.data.message) toast.success(config.data.message);
		}

		return config;
	},
	error => {
		console.log(error, 'error');
		if (error.config.method.toLowerCase() !== 'get') {
			const message = error.response.data.message;
			if (message) toast.error(message);
			const errors = error.response.data.errors;
			if (errors) toast.error(errors);
		}
	}
);

export const useRequest = (requestType = 'get') => {
	const [data, setData] = useState({
		loading: false,
		error: null,
		data: null,
	});
	const request = async (url, body) => {
		setData(prev => ({ ...prev, loading: true }));
		try {
			const response = await requester[requestType](url, body);
			setData(prev => ({ ...prev, data: response?.data }));
			return response.data;
		} catch (e) {
			console.error(e);
			setData(prev => ({ ...prev, error: e }));
			throw e;
		} finally {
			setData(prev => ({ ...prev, loading: false }));
		}
	};
	return { setData, request, ...data };
};

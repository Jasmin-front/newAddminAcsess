import axios from 'axios';
import { useState } from 'react';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const requester = axios.create({ baseURL: BASE_URL });

export const useRequest = (requestType = 'get') => {
	const [data, setData] = useState({
		loading: true,
		error: null,
		data: null,
	});
	const request = async (url, body) => {
		setData(prev => ({ ...prev, loading: true }));
		try {
			const { data } = await requester[requestType](url, body);
			setData(prev => ({ ...prev, data }));
			return data;
		} catch (e) {
			console.log(e);
			setData(prev => ({ ...prev, error: e }));
		} finally {
			setData(prev => ({ ...prev, loading: false }));
		}
	};
	return { data, setData, request };
};

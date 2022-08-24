import { useState, useEffect } from "react";

export function useAccessToken() {
		const [accessToken, setAccessToken] = useState(null);
		const [isLoading, setIsLoading] = useState(true);
		const [error, setError] = useState(null);

		// useEffect(() => {
		// 		const getAccessToken = async () => {
		// 				try {
		// 						const accessToken = await ;
		// 						setAccessToken(accessToken);
		// 				} catch (error) {
		// 						setError(error);
		// 				} finally {
		//					setIsLoading(false);
		// 				}
		}
		// 		}
		// 		getAccessToken();
		// } , []);

		return { accessToken, isLoading, error };
}

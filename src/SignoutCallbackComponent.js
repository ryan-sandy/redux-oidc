import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';

const SignoutCallbackComponent = ({ children, userManager, successCallback, errorCallback }) => {
	let shouldCancel = useRef(false);
	useEffect(() => {
		const onRedirectCallback = async () => {
			try {
				const user = await userManager.signoutRedirectCallback();
				if (user) {
					successCallback(user);
				} else {
					throw new Error('User is not authenticated');
				}
			} catch (error) {
				if (!errorCallback) {
					throw new Error(`Error handling redirect callback: ${error.message}`);
				}

				errorCallback(error);
			}
		}
		if (!shouldCancel.current) {
			onRedirectCallback();
		}

		return () => {
			shouldCancel.current = true;
		}
	}, []);

	return React.Children.only(children);
}

SignoutCallbackComponent.propTypes = {
    // the content to render
    children: PropTypes.element.isRequired,

    // the userManager
    userManager: PropTypes.object.isRequired,

    // a function invoked when the callback succeeds
    successCallback: PropTypes.func.isRequired,

    // a function invoked when the callback fails
    errorCallback: PropTypes.func
}

export default SignoutCallbackComponent;

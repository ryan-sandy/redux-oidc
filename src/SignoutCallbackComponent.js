import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

const SignoutCallbackComponent = ({ children, userManager, successCallback, errorCallback }) => {
	const onRedirectSuccess = (user) => successCallback(user);

	const onRedirectError = (error) => {
		if (!errorCallback) {
      throw new Error(`Error handling redirect callback: ${error.message}`);
		}

		errorCallback(error);
  };

	useEffect(() => {
		userManager.signinRedirectCallback()
      .then(onRedirectSuccess)
      .catch(onRedirectError);
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

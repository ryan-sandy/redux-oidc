import React, { useEffect } from 'react';
import { userExpired, userFound, silentRenewError, sessionTerminated, userExpiring, userSignedOut } from './actions';



const OidcProvider = ({ children, userManager, store }) => {
	// event callback when the user has been loaded (on silent renew or redirect)
	const onUserLoaded = (user) =>{ store.dispatch(userFound(user))};

	// event callback when silent renew errored
  const onSilentRenewError = (error) => {
		store.dispatch(silentRenewError(error))
	};

  // event callback when the access token expired
  const onAccessTokenExpired = () => {
		store.dispatch(userExpired())
	};

  // event callback when the user is logged out
  const onUserUnloaded = () => {
		store.dispatch(sessionTerminated())
	};

  // event callback when the user is expiring
  const onAccessTokenExpiring = () => {
		store.dispatch(userExpiring())
	};

  // event callback when the user is signed out
  const onUserSignedOut = () => {
		store.dispatch(userSignedOut())
	};

	useEffect(() => {
		userManager.events.addUserLoaded(onUserLoaded);
    userManager.events.addSilentRenewError(onSilentRenewError);
    userManager.events.addAccessTokenExpired(onAccessTokenExpired);
    userManager.events.addAccessTokenExpiring(onAccessTokenExpiring);
    userManager.events.addUserUnloaded(onUserUnloaded);
    userManager.events.addUserSignedOut(onUserSignedOut);

		return () => {
			userManager.events.removeUserLoaded(onUserLoaded);
			userManager.events.removeSilentRenewError(onSilentRenewError);
			userManager.events.removeAccessTokenExpired(onAccessTokenExpired);
			userManager.events.removeAccessTokenExpiring(onAccessTokenExpiring);
			userManager.events.removeUserUnloaded(onUserUnloaded);
			userManager.events.removeUserSignedOut(onUserSignedOut);
		}
	}, [])

	return React.Children.only(children);
}

export default OidcProvider;

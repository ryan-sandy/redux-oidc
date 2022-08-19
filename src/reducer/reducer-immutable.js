import {
  USER_EXPIRED,
  USER_FOUND,
  SILENT_RENEW_ERROR,
  SESSION_TERMINATED,
  LOADING_USER,
  USER_SIGNED_OUT
} from '../constants';

/**
 *
 * @param {object} immutable - The immutableJS library
 */
export default function createImmutableReducer(immutable) {
  let reducer;

  try {
    const { fromJS, Seq } = immutable;

      const fromJSGreedy = (js) => {
				if(typeof js !== 'object' || js === null)
					return js;

				if(Array.isArray(js))
					return Seq(js).map(fromJSGreedy).toList();

				return Seq(js).map(fromJSGreedy).toMap();
      }

      const initialState = fromJS({
        user: null,
        isLoadingUser: false
      });

      reducer = (state = initialState, action) => {
        switch (action.type) {
          case USER_EXPIRED:
          case SILENT_RENEW_ERROR:
          case SESSION_TERMINATED:
          case USER_SIGNED_OUT:
            return fromJS({
              user: null,
              isLoadingUser: false
            });
          case USER_FOUND:
            return fromJSGreedy({
              user: action.payload,
              isLoadingUser: false
            });
          case LOADING_USER:
            return state.set('isLoadingUser', true);
          default:
            return state;
        }
      };

      return reducer;
  } catch (error) {
    reducer = () => {
      console.error("redux-oidc: You must install immutable-js for the immutable reducer to work!");
    };
  }
}

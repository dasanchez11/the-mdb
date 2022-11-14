import {
  Logout,
  SignInFailure,
  SignInStart,
  SignInSuccess,
} from './auth.actions';

describe('Auth Actions', () => {
  it('Should sign in start', () => {
    const mockToken = 'token';
    const action = SignInStart({ payload: mockToken });
    expect(action.type).toEqual('[AuthHttpService] SIGN_IN_START');
    expect(action.payload).toEqual(mockToken);
  });

  it('Should Sign In Succes', () => {
    const signInSuccessMock = {
      avatar: {
        gravatar: {
          hash: 'hash',
        },
      },
      id: 1,
      iso_639_1: 'iso',
      iso_3166_1: 'iso2',
      name: 'name',
      include_adult: false,
      username: 'username',
    };
    const action = SignInSuccess({ payload: signInSuccessMock });
    expect(action.type).toEqual('[AuthHttpService] SIGN_IN_SUCCESS');
    expect(action.payload).toEqual(signInSuccessMock);
  });

  it('Should Sign In Failure', () => {
    const errorMock = 'Error Occurred';
    const action = SignInFailure({ payload: errorMock });
    expect(action.type).toEqual('[AuthHttpService] SIGN_IN_FAILURE');
    expect(action.payload).toEqual(errorMock);
  });

  it('Should Logout [Logout]', () => {
    const action = Logout();
    expect(action.type).toEqual('[Shared Navbar] LOGOUT');
  });
});

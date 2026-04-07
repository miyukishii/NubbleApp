import { renderHook, waitFor } from "test-utils";

import { useAuthCredentials } from "../../../../services/authCredentials/useAuthCredentials";
import { authService } from "../../authService";
import { useAuthSignIn } from "../useAuthSignIn";

import { mockedAuthCredentials } from "./mockedData/mocks";

jest.mock('../../../../services/authCredentials/useAuthCredentials');

const mockSaveCredentials = jest.fn();

(useAuthCredentials as jest.Mock).mockReturnValue({
  saveCredentials: mockSaveCredentials,
});

describe('useAuthSignIn', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('saves credentials if successfully sign-in', async () => {
    const signInData = {
      email: 'mariajulia@coffstack.com',
      password: 'supersecret'
    };
    jest.spyOn(authService, 'signIn').mockResolvedValueOnce(mockedAuthCredentials);

    const { result } = renderHook(() => useAuthSignIn())

    await waitFor(() => {
      result.current.signIn(signInData);
    });

    expect(authService.signIn).toHaveBeenCalledWith(signInData);
    expect(mockSaveCredentials).toHaveBeenCalledWith(mockedAuthCredentials);
    expect(mockSaveCredentials).toHaveBeenCalledTimes(1);
  })
  it('show error message if sign-in fails', async () => {
    const signInData = {
      email: 'mariajulia@coffstack.com',
      password: 'supersecret'
    };
    jest.spyOn(authService, 'signIn').mockRejectedValue(new Error('invalid e-mail or password'));
    const { result } = renderHook(() => useAuthSignIn())
    await waitFor(() => {
      result.current.signIn(signInData);
    });
    expect(authService.signIn).toHaveBeenCalledWith(signInData);
    expect(result.current.isError).toBeTruthy();
  })
});

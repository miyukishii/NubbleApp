import { act } from 'react';

import { fireEvent, renderScreen, screen } from 'test-utils';

import { AppStack } from '../../../../../routes/AppStack';
import { authCredentialsStorage } from '../../../../../services/authCredentials/authCredentialsStorage';
import { mateusAuthCredentials } from '../../../../../test/server/PostComment/mocks';
import { server } from '../../../../../test/server/server';
import { mockedData } from '../../../../../test/server/User/mocks';

jest.unmock('@react-navigation/native');

beforeAll(() => {
  server.listen();
  jest.spyOn(authCredentialsStorage, 'get').mockResolvedValue(mateusAuthCredentials);
  jest.useFakeTimers();
});
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
  jest.resetAllMocks();
  jest.useRealTimers();
});

describe('integration: SearchScreen', () => {
  test('Search Flow', async () => {
    //1) Navigate to Search Screen
    renderScreen(<AppStack initialRouteName="SearchScreen" />);

    // 2) Find the search input and type username
    const inputText = screen.getByPlaceholderText(/digite sua busca/i);

    fireEvent.changeText(inputText, 'mar');
    act(() => jest.runAllTimers());

    // 3) Find users as per the MSW mock
    const searchedUser = await screen.findByText(mockedData.user1.username);
    expect(searchedUser).toBeTruthy();

    const searchedUsers = await screen.findAllByTestId('user-profile');
    expect(searchedUsers.length).toBe(2);

    // 4) Select the user1 and navigate to Profile Screen
    fireEvent.press(searchedUser);

    // 5)Expect to be at the Profile Screen with user1 loaded
    const userProfle = await screen.findByText(mockedData.user1.full_name);
    expect(userProfle).toBeTruthy();

    // 6)Find button to go back to the Search Screen
    const backButton = await screen.findByText(/voltar/i);
    fireEvent.press(backButton);

    // 7)Should be on Search Screen with user1 on seach history list
    const searchHistory = await screen.findAllByTestId('user-profile');
    expect(searchHistory.length).toBe(1);

    // 8) The user2 (NOT pressed) must NOT appear in the search history
    const user2 = screen.queryByText(mockedData.user2.username);
    expect(user2).toBeFalsy();

    // 9) Remove user1 from the search history by pressing the trash icon
    const trashIcon = screen.getByTestId('trash');
    fireEvent.press(trashIcon);

    // 10) Make sure the user1 was removed from the search history
    const user1AfterRemoved = screen.queryByText(mockedData.user1.username);
    expect(user1AfterRemoved).toBeFalsy();
  });
});

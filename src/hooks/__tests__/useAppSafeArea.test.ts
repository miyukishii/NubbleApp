import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';

import { useAppSafeArea } from "@hooks/useAppSafeArea";
import { renderHook } from "test-utils";

import { theme } from "../../theme/theme";

const mockedUseSafeAreaInsets = jest.mocked(useSafeAreaInsets)

describe('useAppSafeArea', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('when the safe area is less the minimum requirement, it returns the minimum requirement', () => {
    mockedUseSafeAreaInsets.mockImplementationOnce(() => ({
      top: 10,
      bottom: 15,
    } as EdgeInsets));
    const { result } = renderHook(() => useAppSafeArea())

    expect(result.current.top).toEqual(theme.spacing.s32)
    expect(result.current.bottom).toEqual(theme.spacing.s20)
  })
  test('when the safe area is greater the minimum requirement, it returns the current safe area value', () => {
    mockedUseSafeAreaInsets.mockImplementationOnce(() => ({
      top: 42,
      bottom: 42,
    } as EdgeInsets));
    const { result } = renderHook(() => useAppSafeArea());

    expect(result.current.top).toEqual(42)
    expect(result.current.bottom).toEqual(42)
  })
});

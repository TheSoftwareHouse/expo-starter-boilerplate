import { renderHook } from '@testing-library/react-native';

import { useStyles } from './useStyles';

describe('useStyles', () => {
  it('should return theme and rt from useUnistyles', () => {
    const { result } = renderHook(() => useStyles());

    expect(result.current).toHaveProperty('theme');
    expect(result.current).toHaveProperty('rt');
    expect(result.current.theme).toHaveProperty('colors');
    expect(result.current.theme).toHaveProperty('spacing');
    expect(result.current.theme).toHaveProperty('typography');
  });

  it('provides access to runtime properties', () => {
    const { result } = renderHook(() => useStyles());

    expect(result.current.rt).toHaveProperty('screen');
    expect(typeof result.current.rt.screen).toBe('object');
  });

  it('should provide theme colors', () => {
    const { result } = renderHook(() => useStyles());

    expect(result.current.theme.colors).toHaveProperty('primary');
    expect(result.current.theme.colors).toHaveProperty('background');
    expect(result.current.theme.colors).toHaveProperty('text');
  });

  it('should provide spacing function that multiplies by 4', () => {
    const { result } = renderHook(() => useStyles());

    expect(typeof result.current.theme.spacing).toBe('function');
    expect(result.current.theme.spacing(2)).toBe(8); // 2 * 4px
    expect(result.current.theme.spacing(4)).toBe(16); // 4 * 4px
  });
});

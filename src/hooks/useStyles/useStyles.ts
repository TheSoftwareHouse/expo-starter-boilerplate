import { useUnistyles } from 'react-native-unistyles';

/**
 * Custom hook that wraps useUnistyles to provide consistent styling and theme access
 * across the application. This abstraction allows for future extensibility
 * and maintains consistency with project patterns.
 */
export const useStyles = () => {
  return useUnistyles();
};

import { StyleSheet } from 'react-native';
import { COLORS } from '../constants';

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.SECONDARY,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    color: COLORS.PRIMARY,
    fontSize: 16,
  },
});

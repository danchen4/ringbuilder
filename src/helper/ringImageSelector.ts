import { METAL } from '../constants';

export const ringImageSelector = (metal: string = '14K White Gold') => {
  if (metal === METAL.WHITE) {
    return 0;
  }
  if (metal === METAL.YELLOW) {
    return 3;
  }
  if (metal === METAL.ROSE) {
    return 6;
  }
  return 0;
}
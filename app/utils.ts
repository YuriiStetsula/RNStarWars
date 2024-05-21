import {Dimensions} from 'react-native';
const {width: deviceWidth} = Dimensions.get('window');

const pcth = (value: number) => {
  return Math.ceil((deviceWidth * value) / 100);
};

const grid = (sizes: number[]) => {
  const count = sizes.length;
  const total = sizes.reduce((sum, n) => sum + n, 0);
  const step = 100 / total;

  return (index: number) => step * (count > index ? sizes[index] : 1);
};

export {pcth, grid};

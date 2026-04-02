const colorsList = [
  'rgba(91, 49, 170)',
  'rgba(253, 129, 0)',
  'rgba(3, 167, 142)',
  'rgba(17, 42, 66)',
  'rgba(209, 0, 8)',
];

export const generateRandomColor = (id: number) =>
  id ? colorsList[id % colorsList.length] : colorsList[1];

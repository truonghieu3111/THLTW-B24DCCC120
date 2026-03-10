export const choices = ['Kéo', 'Búa', 'Bao'];

export const getComputerChoice = () => {
  const randomIndex = Math.floor(Math.random() * 3);
  return choices[randomIndex];
};

export const getResult = (a: string, b: string) => {
  if (a === b) return 'Hòa';

  if (
    (a === 'Kéo' && b === 'Bao') ||
    (a === 'Búa' && b === 'Kéo') ||
    (a === 'Bao' && b === 'Búa')
  ) {
    return 'Thắng';
  }

  return 'Thua';
};
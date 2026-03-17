export const choices = ['Kéo', 'Búa', 'Bao'];

export const getComputerChoice = () => {
  const randomIndex = Math.floor(Math.random() * 3);
  return choices[randomIndex];
};

export const getResult = (player: string, computer: string) => {
  if (player === computer) return 'Hòa';

  if (
    (player === 'Kéo' && computer === 'Bao') ||
    (player === 'Búa' && computer === 'Kéo') ||
    (player === 'Bao' && computer === 'Búa')
  ) {
    return 'Thắng';
  }

  return 'Thua';
};
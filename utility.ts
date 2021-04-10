export const getColumnSpacer = (index: number, length: number) => {
  return {
    start: `${index}` + " ".repeat((length - 3) / 2),
    end: " ".repeat((length - 3) / 2) + "\n",
  };
};

export const rollDice = (player: String) => {
  const randomNumber = Math.ceil(Math.random() * 6);
  console.log(`${player} threw number ${randomNumber}`);
  return randomNumber;
};

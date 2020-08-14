const player = (name, score) => {
  const getName = () => name;
  const getScore = () => score;
  const updateScore = () => { score += 1; };
  return { getScore, getName, updateScore };
};

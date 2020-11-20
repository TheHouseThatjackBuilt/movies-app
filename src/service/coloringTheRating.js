const coloringTheRating = (value) => {
  if (value >= 0 && value < 3) return { borderColor: '#E90000' };
  if (value >= 3 && value < 5) return { borderColor: '#E97E00' };
  if (value >= 5 && value < 7) return { borderColor: '#E9D100' };
  return { borderColor: '#66E900' };
};

export default coloringTheRating;

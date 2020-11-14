const formattedDescription = (str) => {
  const deleteToHere = str.indexOf(' ', 200);
  return `${str.slice(0, deleteToHere)}...`;
};
export default formattedDescription;

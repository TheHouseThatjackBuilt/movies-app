const formattedDescription = (str, title) => {
  const deleteCount = title.length > 20 ? 150 : 200;
  const deleteToHere = str.indexOf(' ', deleteCount);

  if (deleteToHere === -1) return str;
  return `${str.slice(0, deleteToHere)}...`;
};
export default formattedDescription;

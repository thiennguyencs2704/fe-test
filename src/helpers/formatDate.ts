export const formatDate = (data: string) => {
  const dateObject = new Date(data);
  const day = dateObject.getUTCDate();
  const month = dateObject.getUTCMonth();
  const year = dateObject.getUTCFullYear();

  return `${day}-${month}-${year}`;
};

export const getErrorStatus = (message) => {
  const isStatusCode = message.match(/status code [\d][\d][\d]/i);
  return isStatusCode ? isStatusCode[0].match(/[\d]+/)[0] : "";
};

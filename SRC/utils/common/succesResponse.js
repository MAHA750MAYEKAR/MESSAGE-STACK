export const successResponse = (data, message) => {
  return {
    success: 'true',
    message: message,
    data: data
  };
};

const baseUrl = "https://reacttest03-server.herokuapp.com";
// const baseUrl = "http://localhost:2000";

export const api = `${baseUrl}/api`;
export const generateUploadImageUrl = (fileName) => {
  return `${baseUrl}/public/${fileName}`;
};

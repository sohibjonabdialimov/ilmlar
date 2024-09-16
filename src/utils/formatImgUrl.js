export const formatImgUrl = (url) => {
  if (url?.includes("file_id=")) {
    url = url.split("file_id=").join("");
  }
  return url;
};
export const fetcher = (url, options) => {
  return fetch(url, options)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error();
    })
    .then((res) => {
      if (res.code >= 400 && res.code <= 500) {
        throw res;
      }
      return new Promise((resolve, reject) => {
        resolve(res);
      });
    });
};

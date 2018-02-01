export default {
  get: (url) => {
    if (url === '/') {
      return Promise.resolve({
        data: [
          { name: 'Ramon', status: true },
          { name: 'Rodrigo', status: true },
        ],
      });
    }
    return Promise.reject();
  },
};

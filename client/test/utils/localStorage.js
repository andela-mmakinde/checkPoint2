module.exports = {
  setLocalStorage: () => {
    global.localStorage = {
      getItem: key => this[key],
      setItem: ((key, value) => (this[key] = value)),
      removeItem: (key => (delete this[key])),
    };
    const jwt = require('jsonwebtoken');
    const token = jwt.sign({ foo: 'bar' }, 'shhhhh');
    localStorage.setItem('token', token);
  }
};

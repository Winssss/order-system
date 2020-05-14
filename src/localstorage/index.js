const storage = { //封装localstorage方法
  get(key) {
    return JSON.parse(window.localStorage.getItem(key));
  },
  set(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
  },
  remove(key) {
    window.localStorage.removeItem(key);
  }
}

export default storage;


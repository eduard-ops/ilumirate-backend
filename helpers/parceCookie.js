const parceCookie = (str) => {
  return str
    .split(";")
    .map((v) => v.split("="))
    .reduce((acc, v) => {
      acc[v[0].trim()] = decodeURIComponent(v[1].trim());
      return acc;
    }, {});
};

module.exports = parceCookie;

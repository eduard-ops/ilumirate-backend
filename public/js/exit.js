/* eslint-disable no-undef */

const btn = document.getElementById("333");
btn.addEventListener("click", logout);

const parceCookie = (str) => {
  return str
    .split(";")
    .map((v) => v.split("="))
    .reduce((acc, v) => {
      acc[v[0].trim()] = decodeURIComponent(v[1].trim());
      return acc;
    }, {});
};

function logout() {
  if (document.cookie) {
    const { tokens } = parceCookie(document.cookie);
    // eslint-disable-next-line no-unused-vars
    const [_, token] = tokens.split("j:");
    const { accessToken } = JSON.parse(token);

    fetch("http://localhost:5000/api/auth/logout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    })
      .then(() => (document.location.href = "http://localhost:5000/"))
      .catch((error) => console.log(error));
  } else {
    console.log("Cookie not found");
  }
}

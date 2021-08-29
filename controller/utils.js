const { session } = require('electron');

const GetCookies = async () => {
  return session.defaultSession.cookies.get({
    url: "https://www.udemy.com"
  });
}

const GetLoginState = async () => {
  const cookies = await GetCookies();
  const accessTokenCookie = cookies.find(x => x.name === "access_token");
  return !(!accessTokenCookie || !accessTokenCookie.value || accessTokenCookie.value.trim() === "");
}

module.exports = {
  GetCookies,
  GetLoginState,
}

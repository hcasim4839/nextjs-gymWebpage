const USER_ACCOUNT = () => {
  let setName = function setName(nameEntry) {
    sessionStorage.setItem("accountName", nameEntry);
  };
  let getName = function getName() {
    return sessionStorage.getItem("accountName");
  };
  let setPassword = function setPassword(passwordEntry) {
    sessionStorage.setItem("password", passwordEntry);
  };
  let getPassword = function getPassword() {
    return sessionStorage.getItem("password");
  };

  return {
    setName: setName,
    setPassword: setPassword,
    getName: getName,
    getPassword: getPassword,
  };
};

export default USER_ACCOUNT;

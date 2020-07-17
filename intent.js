

const getCurrUser = () => {
  console.log(sessionStorage.getItem("currentUser"))
  return sessionStorage.getItem("currentUser");
}

const getCharacter = () => {
  return sessionStorage.getItem("character");
};

const printHi = () => {
  console.log("hi");
};

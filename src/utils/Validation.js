export const navOptionHandler = () => ({
  headerShown: false,
  animationEnabled: false,
});

export const validateEmail = (value) => {
  var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (emailRex.test(value)) {
    return true;
  }
  return false;
};

export const validateMobile = (value) => {
  // var phoneRex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,8}$/im;
  var phoneRex = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;
  //
  if (phoneRex.test(value)) {
    return true;
  }
  return false;
};

export const validateAlias = (value) => {
  var aliasRex = /^[a-zA-Z0-9_]{3,}[a-zA-Z]+[0-9]*$/;
  if (aliasRex.test(value)) {
    return true;
  }
  return false;
};

export const validateLength = (value, length) => {
  if (value.length >= length) {
    return true;
  }
  return false;
};

export const toPriceFormat = (val) => {
  if (val == null) {
    return "";
  }
  let x = val.toString();
  var afterPoint = "";
  if (x.indexOf(".") > 0) afterPoint = x.substring(x.indexOf("."), x.length);
  val = Math.floor(val);
  return val.toString().replace(/(\d)(?=(\d\d)+\d$)/g, "$1,") + afterPoint;
};

export const isEmpty = (param) => {
  return (
    param == undefined ||
    param == null ||
    (typeof param === "string" && param == "")
  );
};

const isUndefined = (str: any, emptyStringCheck = false): boolean => {
  if (typeof str === 'undefined' || str === null || str === 'undefined' || str === 'null') {
    return true;
  }
  if (emptyStringCheck && typeof str === 'string' && str.toString().trim().length === 0) {
    return true;
  }
  return false;
};

export default isUndefined;

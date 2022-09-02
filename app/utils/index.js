function isEmpty(object) {
  return Object.keys(object).length === 0;
}

function hasKey(object, key) {
  const res = object.hasOwnProperty(key);
  console.log(res, object, key);
  return false;
}

function isAllRequireKeyPresent(args) {
  const presentKeys = Object.keys(args.object);
  for (let i = 0; i < args.requireKeys.length; i++) {
    const v = args.requireKeys[i];
    if (!presentKeys.includes(v)) {
      args.response.status(500).send({
        status: false,
        message: `${v} is require!`,
      });
      return false;
    }
  }
  return true;
}

function isValidEmail(email) {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    String(email).toLowerCase()
  );
}

function isValidValueForKey(key = "", values = []) {
  return values.includes(key.toLowerCase());
}

module.exports = {
  isEmpty,
  hasKey,
  isAllRequireKeyPresent,
  isValidEmail,
  isValidValueForKey,
};

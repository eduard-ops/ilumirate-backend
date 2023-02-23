const tryCatchWrapper = async (fn) => {
  try {
    return await fn;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = tryCatchWrapper;

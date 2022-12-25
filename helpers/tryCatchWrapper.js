const tryCatchWrapper = async (fn) => {
  try {
    const data = await fn;
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = tryCatchWrapper;

const isValidPassword = (password) => {
  const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/;
  return regex.test(password);
};

const isValidEmail = (email) => {
  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return regex.test(email);
};

module.exports = { isValidPassword, isValidEmail };

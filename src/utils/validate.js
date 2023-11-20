export const checkValidation = (email, password, name = "default") => {
  if (name !== "default") {
    const isNameValid =
      /(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/.test(
        name
      );
    if (!isNameValid) {
      return "Name is not valid! Enter first and last name.";
    }
  }

  const isEmailValid = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(email);
  if (!isEmailValid) {
    return "Email is not valid!";
  }

  const isPasswordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
  if (!isPasswordValid) {
    return "Password is not strong!";
  }

  return null;
};

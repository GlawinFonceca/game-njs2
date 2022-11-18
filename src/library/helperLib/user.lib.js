const validate = require("validator");
class user {
  lettersAndSpaceCheck(name) {
    var regEx = /^[a-z][a-z\s]*$/;
    if (name.match(regEx)) {
      return true;
    } else {
      return false;
    }
  }
  async signupValidation(name, email, password, phone) {
    try {
      const isValidUserName = this.lettersAndSpaceCheck(name);
      const isValidUserEmail = validate.isEmail(email);
      const isValidUserPassword = validate.isStrongPassword(password, {
        minLength: 6,
        minUppercase: 1,
        minSymbols: 1,
        returnScore: false,
        minNumbers: 1,
      });
      const isValidPhoneNumber =
        validate.isLength(phone, { min: 10, max: 10 }) &&
        validate.isNumeric(phone);

      if (
        isValidUserName &&
        isValidUserEmail &&
        isValidUserPassword &&
        isValidPhoneNumber
      ) {
        return { status: true };
      } else if (!isValidUserName) {
        return { status: false, message: "name Please enter alphabets only" };
      } else if (!isValidUserEmail) {
        return { status: false, message: "emisl Please enter valid email" };
      } else if (!isValidUserPassword) {
        return {
          status: false,
          message:
            "password, Password should contain one symbol,one uppercase letter, one number and minimum 6 characters",
        };
      } else if (!isValidPhoneNumber) {
        return { status: false, message: "number Please enter valid number" };
      }
    } catch (e) {
      console.log("Error signupValidation =>", e);
    }
  }

  async userUpdate(userId, name, phone) {
    try {
      if (!name && !phone) {
        return {
          status: false,
          message: "name and number Please enter name or phone number",
        };
      } else if (!phone) {
        name = name.toLowerCase();
        const isValiduserName = this.lettersAndSpaceCheck(name);
        if (isValiduserName) {
          await SQLManager.update("user", { user_id: userId }, { name: name });
          return { status: true, message: "Successfully updated" };
        } else {
          return { status: false, message: "name Please enter alphabets only" };
        }
      } else if (!name) {
        const isValidPhoneNumber =
          validate.isLength(phone, { min: 10, max: 10 }) &&
          validate.isNumeric(phone);
        if (isValidPhoneNumber) {
          await SQLManager.update(
            "user",
            { user_id: userId },
            { phone: phone }
          );
          return { status: true };
        } else {
          return {
            status: false,
            message: "number Please enter valid phone number",
          };
        }
      } else {
        const isValiduserName = this.lettersAndSpaceCheck(name);
        const isValidPhoneNumber =
          validate.isLength(phone, { min: 10, max: 10 }) &&
          validate.isNumeric(phone);
        if (isValiduserName && isValidPhoneNumber) {
          name = name.toLowerCase();
          let userObj = {
            name,
            phone,
          };
          await SQLManager.update("user", { user_id: userId }, userObj);
          return { status: true };
        } else if (!isValiduserName) {
          return { status: false, message: "name Please enter alphabets only" };
        } else if (!isValidPhoneNumber) {
          return {
            status: false,
            message: "number Please enter valid phone number",
          };
        } else {
          return {
            status: false,
            message: "name and number Please enter name and phone number",
          };
        }
      }
    } catch (e) {
      console.log("Error userUpdateValidation=>", e);
    }
  }
}

module.exports = user;

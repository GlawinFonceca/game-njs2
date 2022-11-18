class UserSignupInitalize extends baseInitialize {
  constructor() {
    super();
    this.initializer = {};
    this.initializer.isSecured = false; // values: true/false
    this.initializer.requestMethod = ["POST"]; // requestMethod: ['GET', 'POST', 'PUT', 'DELETE']
  }

  getParameter() {
    const param = {
      name: {
        name: "name",
        type: "string",
        description: "user name",
        required: true,
        default: "",
      },
      email: {
        name: "email",
        type: "string",
        description: "user email",
        required: true,
        default: "",
      },
      password: {
        name: "password",
        type: "string",
        description: "user password",
        required: true,
        default: "",
      },
      phone: {
        name: "phone",
        type: "string",
        description: "user phone",
        required: true,
        default: "",
      },
    };

    return { ...param };
  }
}

module.exports = UserSignupInitalize;

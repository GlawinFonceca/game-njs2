class UserLoginInitalize extends baseInitialize {
  constructor() {
    super();
    this.initializer = {};
    this.initializer.isSecured = false; // values: true/false
    this.initializer.requestMethod = ["POST"]; // requestMethod: ['GET', 'POST', 'PUT', 'DELETE']
  }

  getParameter() {
    const param = {
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
    };

    return { ...param };
  }
}

module.exports = UserLoginInitalize;

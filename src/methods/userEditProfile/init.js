
class UserEditProfileInitalize extends baseInitialize {

  constructor() {
    super();
    this.initializer =  {};
    this.initializer.isSecured = true; // values: true/false
    this.initializer.requestMethod = ['POST']; // requestMethod: ['GET', 'POST', 'PUT', 'DELETE']
  }

  getParameter() {
    const param = {
      name: {
        name: "name",
        type: "string",
        description: "user name",
        required: false,
        default: "",
      },
      phone: {
        name: "phone",
        type: "string",
        description: "user phone",
        required: false,
        default: "",
      },  
    };

    return { ...param };
  }
}

module.exports = UserEditProfileInitalize;
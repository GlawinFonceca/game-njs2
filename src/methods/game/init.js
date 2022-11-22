class GameInitalize extends baseInitialize {
  constructor() {
    super();
    this.initializer = {};
    this.initializer.isSecured = true; // values: true/false
    this.initializer.requestMethod = ["POST"]; // requestMethod: ['GET', 'POST', 'PUT', 'DELETE']
  }

  getParameter() {
    const param = {
      index: {
        name: "index",
        type: "number",
        description: "Enter a index between 1 to 9",
        required: false,
        default: "",
      },
      value: {
        name: "value",
        type: "string",
        description: "Enter 'x' or 'o'",
        required: false,
        default: "",
      },
    };

    return { ...param };
  }
}

module.exports = GameInitalize;

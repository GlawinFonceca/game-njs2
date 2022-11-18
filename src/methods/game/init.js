class GameInitalize extends baseInitialize {
  constructor() {
    super();
    this.initializer = {};
    this.initializer.isSecured = true; // values: true/false
    this.initializer.requestMethod = ["POST"]; // requestMethod: ['GET', 'POST', 'PUT', 'DELETE']
  }

  getParameter() {
    const param = {
      matrix: {
        name: "matrix",
        type: "string",
        description: "matrix",
        required: false,
        default: "",
      },
    };

    return { ...param };
  }
}

module.exports = GameInitalize;

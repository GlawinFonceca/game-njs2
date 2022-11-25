class SendMessageInitalize extends baseInitialize {
  constructor() {
    super();
    this.initializer = {};
    this.initializer.isSecured = false; // values: true/false
    this.initializer.requestMethod = ["GET"]; // requestMethod: ['GET', 'POST', 'PUT', 'DELETE']
  }

  getParameter() {
    const param = {
      userId: {
        name: "user_id",
        type: "number",
        description: "user id",
        required: false,
        default: "",
      },
      message: {
        name: "user_message",
        type: "string",
        description: "user message",
        required: false,
        default: "",
      },

    };

    return { ...param };
  }
}

module.exports = SendMessageInitalize;

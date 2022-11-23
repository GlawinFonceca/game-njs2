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
        description: "Enter a index between 0 to 8",
        required: true,
        default: "",
      },
      value: {
        name: "value",
        type: "string",
        description: "Enter 'x' or 'o'",
        required: true,
        default: "",
      },
      roomId: {
        name: "roomId",
        type: "string",
        description: "user's room_id",
        required: true,
        default: "",
      },
    };

    return { ...param };
  }
}

module.exports = GameInitalize;

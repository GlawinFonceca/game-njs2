class JoinGameInitalize extends baseInitialize {
  constructor() {
    super();
    this.initializer = {};
    this.initializer.isSecured = true; // values: true/false
    this.initializer.requestMethod = ["POST"]; // requestMethod: ['GET', 'POST', 'PUT', 'DELETE']
  }

  getParameter() {
    const param = {
      game_mode: {
        name: "game_mode",
        type: "number",
        description: "game mode",
        required: true,
        default: 0,
      },
      roomId: {
        name: "roomId",
        type: "string",
        description: "room id",
        required: false,
        default: "",
      },
    };

    return { ...param };
  }
}

module.exports = JoinGameInitalize;

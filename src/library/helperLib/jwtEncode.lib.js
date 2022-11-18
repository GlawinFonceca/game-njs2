const jwt = require('jsonwebtoken');
const {JWT_SECRET} = JSON.parse(process.env.AUTH);
class jwtEncode {  
    async jwtEncryption(userId) {
        try {
          const accessToken = jwt.sign({user_id:userId}, JWT_SECRET);
          if (userId) {
            return {access_token :accessToken};
          } else {
            return undefined;
          }
        } catch (e) {
          console.log("Error jwtEncryption =>", e);
        }
      }
  }
  
  module.exports = jwtEncode;

const jwt=require("jsonwebtoken")
require("dotenv").config()

const authenticateUser = (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
   
      const decodedToken = jwt.verify(token, process.env.sectretKey);
     console.log(decodedToken)
      req.body.userId = decodedToken.userId ;
      req.body.username=decodedToken.username
      next();
    } catch (error) {
      res.status(401).json({ message: 'Authentication failed' });
    }
  };
  module.exports={
    authenticateUser
  }

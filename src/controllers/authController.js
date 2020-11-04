const jwt = require('jsonwebtoken');

const { secret } = require('../config/config.json');

const User = require('../models/User');

module.exports = {
  async register(req, res){
    try{
      const { name, email, password } = req.body;

      const findUser = await User.findOne({
        where: { email }
      });

      if(findUser)
        return res.status(400).json({ error: "email already exists" });

      const user = await User.create({ name, email, password })

      return res.json(user);
    }catch(err){
      return res.status(400).json({ error: err.message });
    }
  },
  async authenticate(req, res){
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email }
    });

    if(!user)
      return res.status(401).json({ error: "Account not found" });

    if(user.password !== password)
      return res.status(401).json({ error: "Password is invalid" });

    const { id, name } = user;

    var token = jwt.sign({ id, name, email }, secret, {
      expiresIn: '1d'
    });

    res.json({ token: `Bearer ${token}` });
  }
}

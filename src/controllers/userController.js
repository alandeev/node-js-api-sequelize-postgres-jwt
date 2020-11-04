const User = require('../models/User');

module.exports = {
  async index (req, res){
    const { id } = req.user;

    const user = await User.findByPk(id, {
      include: 'posts'
    })

    if(!user)
      return res.status(400).json({ error: "User not found" });

    user.password = undefined;
    return res.json(user);
  },
  async GetById(req, res){
     const { user_id } = req.params;

    if(!user_id)
      return res.json({ error: "you need send params [ 'user_id' ]" })

    const user = await User.findByPk(user_id, {
      include: 'posts'
    })

    if(!user)
      return res.status(400).json({ error: "User not found" });

    user.password = undefined;
    user.email = undefined;

    return res.json(user);
  },
  async changePassword(req, res){
    const { passwordNow, passwordNew } = req.body;
    const { id } = req.user;

    if(!passwordNow || !passwordNew)
      return res.json({ error: "Need send params" });

    const user = await User.findOne({
      where: { id }
    })

    if(passwordNow !== user.password)
      return res.json({ error: "Your password is not valid" });

    user.password = passwordNew;
    await user.save();

    return res.json(user);
  }
}

const Post = require('../models/Post');
const User = require('../models/User');

module.exports = {
  async create(req, res){
    try{
      const { id } = req.user;
      const { title, description } = req.body;

      if(!title || !description)
        return res.status(400).json({ error: "Need params to create one post" });

      const user = await User.findByPk(id);

      if(!user)
        return res.json({ error: "user not found" });

      const post = await Post.create({ user_id: id, title, description });

      return res.json(post);
    }catch(err){
      res.json({ error: err.message });
    }
  },
  async delete(req, res){
    const { id: user_id } = req.user;
    const { post_id } = req.params;

    const post = await Post.findByPk(post_id);

    if(!post)
      return res.status(400).json({ error: 'Post not found' });

    if(post.user_id !== user_id)
      return res.status(401).json({ error :"don't have permission" });

    await post.destroy();

    return res.json({ success: "Post deleted with success", user_id, post_id })
  },
  async getAll(req, res){
    const posts = await Post.findAll();

    return res.json(posts)
  }
}

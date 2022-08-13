const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");

router.get("/", async (req, res) => {
  try {
    if (req.session.loggedIn) {
      const dbPostData = await Post.findAll({
        where: {
          user_id: req.session.user_id,
        },
        attributes: ["id", "title", "post_content", "created_at"],
        include: [
          {
            model: User,
            attributes: ["username"],
          },
          {
            model: Comment,
            attributes: [
              "id",
              "comment_text",
              "user_id",
              "post_id",
              "created_at",
            ],
            include: {
              model: User,
              attributes: ["username"],
            },
          },
        ],
      });
      const posts = dbPostData.map((post) => {
        return post.get({ plain: true });
      });
      res.render("dashboard", { posts, loggedIn: req.session.loggedIn });
    } else {
      res.redirect("/signup");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;

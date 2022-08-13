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

router.get("/edit/:id", async (req, res) => {
  try {
    if (req.session.loggedIn) {
      const dbPostData = await Post.findOne({
        where: {
          id: req.params.id,
        },
        attributes: ["id", "title", "post_content", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      });
      if (!dbPostData) {
        res.status(404).json({ message: "No post with that ID was found." });
      }
      const post = dbPostData.get({ plain: true });
      res.render("editpost", { post, loggedIn: req.session.loggedIn });
    } else {
      res.redirect("/signup");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/newpost", (req, res) => {
  if (req.session.loggedIn) {
    res.render("newpost", { loggedIn: req.session.loggedIn });
    return;
  }
  res.redirect("/signup");
});

module.exports = router;

exports.getLandingPage = (req, res) => {
  res.status(200).render("landing");
};

exports.getLoginForm = (req, res) => {
  res.status(200).render("login", {
    title: "Log into your account",
  });
};

exports.getArticles = (req, res) => {
  res.status(200).render("articles");
};

exports.getTaskManager = (req, res) => {
  res.status(200).render("kanban");
};

exports.getPomodoro = (req, res) => {
  res.status(200).render("pomodoro");
};

exports.getMeditation = (req, res) => {
  res.status(200).render("meditation");
};

exports.getChatBot = (req, res) => {
  res.status(200).render("chatBot");
};

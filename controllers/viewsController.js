exports.getLandingPage = (req, res) => {
  res.status(200).render("landing");
};

exports.getLoginForm = (req, res) => {
  res.status(200).render("login", {
    title: "Log into your account",
  });
};

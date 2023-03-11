exports.getHomePage = (req, res) => {
  res.status(200).render("home");
};

exports.getLoginForm = (req, res) => {
  res.status(200).render("login", {
    title: "Log into your account",
  });
};

exports.getCalendar = (req, res) => {
  res.status(200).render("calendar");
};

exports.getKanban = (req, res) => {
  res.status(200).render("kanban");
};

exports.getPomodoro = (req, res) => {
  res.status(200).render("pomodoro");
};

exports.getMeditation = (req, res) => {
  res.status(200).render("meditation");
};

exports.getChatRoom = (req, res) => {
  res.status(200).render("chatRoom");
};

exports.getChatLobby = (req, res) => {
  res.status(200).render("chatLobby");
};

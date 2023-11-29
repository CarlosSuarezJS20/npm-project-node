exports.get400ErrorPage = (req, res) => {
  // chaining
  // res.status(404).sendFile(path.join(rootDir, "views", "no-page-found.html"));
  res.status(404).render("404", { pageTitle: "Page Not Found", path: "" });
};

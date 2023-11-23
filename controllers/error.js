exports.get400ErrorPage = (req, res) => {
  // chaining
  // res.status(404).sendFile(path.join(rootDir, "views", "no-page-found.html"));
  res
    .status(404)
    .render("no-page-Found", { pageTitle: "Page Not Found", path: "" });
};

module.exports = function (app) {
  require('./annotation.js')(app);
  require('./confirmed-click.js')(app);
  require('./create-inline-annotation.js')(app);
  require('./gravatar.js')(app);
  require('./highlights')(app);
  require('./inline-annotation.js')(app);
  require('./kramjax.js')(app);
  require('./onTextSelect.js')(app);
  require('./showPdf.js')(app);
  require('./subnav')(app);
  require('./validateArticleSource')(app);
  require('./validate-username')(app);
};

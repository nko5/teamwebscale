FlowRouter.route('/', {
  action() {
    ReactLayout.render(MainLayout, { content: <Home /> });
  }
});

FlowRouter.route('/test', {
  action() {
    ReactLayout.render(MainLayout, { content: <Test /> });
  }
});

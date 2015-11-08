FlowRouter.route('/', {
  action() {
    ReactLayout.render(MainLayout, { content: <Home /> });
  }
});

FlowRouter.route('/public/new', {
  action() {
    ReactLayout.render(MainLayout, { content: <CreatePublicGame /> });
  }
});

FlowRouter.route('/private/new', {
  action() {
    ReactLayout.render(MainLayout, { content: <CreatePrivateGame /> });
  }
});

FlowRouter.route('/private/join', {
  action() {
    ReactLayout.render(MainLayout, { content: <JoinPrivateGame /> });
  }
});


FlowRouter.route('/public/join', {
  action() {
    ReactLayout.render(MainLayout, { content: <JoinPublicGame /> });
  }
});

// FlowRouter.route('/test', 
//   action() {
//     ReactLayout.render(MainLayout, { content: <Test /> });
//   }
// });

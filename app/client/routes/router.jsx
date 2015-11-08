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
  },
  subscriptions(params, queryParams) {
    this.register('joinPublicGames', Meteor.subscribe('joinPublicGames'));
  }
});

FlowRouter.route('/public/lobby/:id', {
  action() {
    ReactLayout.render(MainLayout, {content: <GameLobby />});
  },
  subscriptions(params, queryParams) {
    this.register('game', Meteor.subscribe('game', params.id));
    this.register('gamePlayers', Meteor.subscribe('gamePlayers', params.id));
  }
});
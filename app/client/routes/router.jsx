FlowRouter.route('/', {
  action() {
    ReactLayout.render(MainLayout, { content: <Home /> });
  }
});

FlowRouter.route('/public/new', {
  action() {
    ReactLayout.render(MainLayout, {
      content: <CreatePublicGame />,
      title: 'Create a Public Game'
    });
  }
});

FlowRouter.route('/private/new', {
  action() {
    ReactLayout.render(MainLayout, {
      content: <CreatePrivateGame />,
      title: 'Create a Private Game'
    });
  }
});

FlowRouter.route('/private/join', {
  action() {
    ReactLayout.render(MainLayout, {
      content: <JoinPrivateGame />,
      title: 'Join a Private Game'
    });
  },
  subscriptions(params, queryParams) {
    this.register('joinPrivateGames', Meteor.subscribe('joinPrivateGames'));
  }
});


FlowRouter.route('/public/join', {
  action() {
    ReactLayout.render(MainLayout, {
      content: <JoinPublicGame />,
      title: 'Join a Public Game'
    });
  },
  subscriptions(params, queryParams) {
    this.register('joinPublicGames', Meteor.subscribe('joinPublicGames'));
  }
});

FlowRouter.route('/lobby/:id', {
  action() {
    ReactLayout.render(MainLayout, {
      content: <GameLobby />,
      title: 'Game Lobby'
    });
  },
  subscriptions(params, queryParams) {
    this.register('game', Meteor.subscribe('game', params.id));
    this.register('gamePlayers', Meteor.subscribe('gamePlayers', params.id));
  }
});

FlowRouter.route('/play/:id', {
  action() {
    ReactLayout.render(MainLayout, {
      content: <GameCenter />,
      title: 'Playing Game'
    });
  },
  subscriptions(params, queryParams) {
    this.register('game', Meteor.subscribe('game', params.id));
    this.register('gamePlayers', Meteor.subscribe('gamePlayers', params.id));
  }
});

FlowRouter.route('/results/:id', {
  action() {
    ReactLayout.render(MainLayout, {content: <GameResults />});
  },
  subscriptions(params, queryParams) {
    this.register('game', Meteor.subscribe('game', params.id));
    this.register('gamePlayers', Meteor.subscribe('gamePlayers', params.id));
  }
});

FlowRouter.route('/summary/:id', {
  action() {
    ReactLayout.render(MainLayout, {content: <GameSummary />});
  },
  subscriptions(params, queryParams) {
    this.register('game', Meteor.subscribe('game', params.id));
    this.register('gamePlayers', Meteor.subscribe('gamePlayers', params.id));
  }
});

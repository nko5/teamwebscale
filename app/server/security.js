Games.allow({
  insert: function(userId){
    if(!Meteor.userId()){
      return false;
    }

    return true;
  },

  update: function(){
    return true;
  }
});
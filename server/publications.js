Meteor.publish('schemas', function() {
	return Collections.Schemas.find({});
});

Meteor.publish('favorites', function() {
	return Collections.Favorites.find({});
});
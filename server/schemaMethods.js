Meteor.methods({
    'saveSchema': function(doc){
    	if (!doc.creator) { doc.creator = this.userId }
    	var schema = Collections.Schemas.upsert(doc._id, { $set: { name: doc.name, segments: doc.segments, creator: doc.creator } });
   		console.log(schema);
   		return schema.insertedId || doc._id;
    },
    'deleteSchema': function(doc) {
    	if(doc.creator === this.userId) {
    		Collections.Schemas.remove({ _id: doc._id });
    		return doc._id;
    	}
    	else {
    		return "You do not have permission to delete that schema.";
    	}
    },
    'toggleSchemaFavorite': function(schema) {
        var isFavorite = Collections.Favorites.findOne({ schema: schema._id, user: this.userId }) ? true : false;
        if (isFavorite) { 
            Collections.Favorites.remove({ schema: schema._id, user: this.userId }); 
            return "Favorite Deleted";
        }
        else {
            Collections.Favorites.insert({ schema: schema._id, user: this.userId });
            return "Favorite Added";
        }
    }
});
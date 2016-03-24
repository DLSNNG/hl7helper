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
    }
});
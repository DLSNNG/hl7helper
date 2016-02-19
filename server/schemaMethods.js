Meteor.methods({
    'saveSchema': function(doc){
    	var schema = Collections.Schemas.upsert(doc._id, { $set: { name: doc.name, segments: doc.segments } });
   		console.log(schema);
   		return schema.insertedId || doc._id;
    }
});
Models = {
	Schema: schema,
	Segment: segment,
	Field: field,
	SubField: subField
}

/*function schema(doc) {
	var schema = {
		segments: doc ? doc.segments : {},
		addSegment: function(segmentString) {
			var fields = segmentString.split('|');
			var header = fields[0];
			fields.shift();
			this.segments[header] = this.parseFields(fields);
		},
		parseFields: function(fieldsArray) {
			var fields = {};
			for(var i=0; i<fieldsArray.length; i++) {
				fields[i] = fieldsArray[i];
			}
			return fields;
		},
		save: function() {
			Meteor.call("saveSchema", this);
		}
	}

	return schema;	
}*/

function schema(doc) {
	var schema = {
		_id: doc ? doc._id : null,
		name: doc ? doc.name : "",
		segments: doc ? doc.segments : {},
		addSegment: function(segmentObject) {
			var segmentName = segmentObject.name;
			var segmentFields = segmentObject.fields;
			var segment = {
				name: segmentName,
				fields: segmentFields
			}
			this.segments[segmentName] = segment;
		},
		save: function() {
			console.log("saving", this);
			Meteor.call("saveSchema", this, function(error, schemaID) {
				if(error) { console.log("ERROR", error); }
				else { console.log("Added Schema", Collections.Schemas.findOne(schemaID)); }
			});
		}
	}
	return schema;
}

function segment() {
	var segment = {
		name: "",
		fields: [],
		addField: function(fieldObject) {
			this.fields.push(fieldObject);
		}
	}
	return segment;
}

function field() {
	var field = {
		description: "",
		subfields: [],
		addSubField: function(subfieldObject) {
			this.subfields.push(subfieldObject);
		}
	}
	return field;
}

function subField() {
	var subField = {
		description: ""
	}
	return subField;
}
Segments = React.createClass({

	propTypes: {
		message: React.PropTypes.string,
		schema: React.PropTypes.object
	},

	parseSegments() {
		var message = this.props.message;
		var segments = message.split('\n');
		return segments;
	},

	renderSegments() {
		console.log("segments", this.parseSegments());
		var schema = new Models.Schema();
		var segment = new Models.Segment();
		var field = new Models.Field();
		var subField = new Models.SubField();

		subField.description = "subfield";
		field.description = "field";
		field.addSubField(subField);
		segment.name = "segment";
		segment.addField(field);
		schema.addSegment(segment);

		console.log("schema", schema);
		var self = this;
		var segmentNodes = this.parseSegments().map(function(segment, index) {
			var ind = index + 1;
			return (
				<Segment
					key={"segment"+ind} 
					segment={segment}
					index={ind}
					schema={self.props.schema} />
			)
		})
		return segmentNodes;
	},

	render() {
		return (
			<div className="container">
				{this.renderSegments()}
			</div>
		)
	}
});
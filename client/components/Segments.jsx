Segments = React.createClass({

	propTypes: {
		message: React.PropTypes.string
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

		var segmentNodes = this.parseSegments().map(function(segment, index) {
			var ind = index + 1;
			return (
				<Segment
					key={"segment"+ind} 
					segment={segment}
					index={ind} />
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
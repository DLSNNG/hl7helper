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
		var message = new Models.Message(this.props.message);
		console.log("message", message);
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
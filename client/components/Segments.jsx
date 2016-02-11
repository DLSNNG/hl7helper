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
ViewSegment = React.createClass({

	propTypes: {
		segment: React.PropTypes.object,
		selectField: React.PropTypes.func
	},

	selectField(field) {
		this.props.selectField(field);
	},

	render() {
		var self=this;
		return (
			<div>
				<h3>{this.props.segment.name}</h3>
				<ViewSegmentList 
					fields={self.props.segment.fields}
					selectField={self.selectField} />
			</div>
		)
	}
});
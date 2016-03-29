ViewField = React.createClass({

	propTypes: {
		segment: React.PropTypes.object,
		fieldNumber: React.PropTypes.string
	},

	selectSubfield(subfield) {
		console.log("selected subfield", subfield);
	},

	render() {
		var self = this;
		var fieldNumber = this.props.fieldNumber;
		var displayNumber = parseInt(fieldNumber) + 1;
		var segment = this.props.segment;
		console.log("fieldNumber", fieldNumber);
		var subFields = segment.fields[fieldNumber].subfields.map(function(subField, index) {
			var display = parseInt(index + 1) + ": " + subField.description;
			return (
				<li key={index+1} className="list-group-item list-hover">
					{display}
				</li>
			)
		});
		console.log(segment.fields[fieldNumber].subfields);
		return (
			<div>
				<h3>{segment.name} - {displayNumber}</h3>
				<ViewSegmentList 
					fields={self.props.segment.fields[self.props.fieldNumber].subfields}
					selectField={self.selectSubfield} />
			</div>
		)
	}
});
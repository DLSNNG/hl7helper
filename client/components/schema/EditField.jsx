EditField = React.createClass({

	propTypes: {
		segment: React.PropTypes.object,
		fieldNumber: React.PropTypes.string,
		updateSegment: React.PropTypes.func
	},

	addSubField(e) {
		e.preventDefault();

		var segment = this.props.segment;
		var fieldNumber = this.props.fieldNumber;
		var subField = new Models.SubField();
			subField.description = this.refs.subFieldDescription.value;
		var field =	segment.fields[fieldNumber];
			field.subfields.push(subField);
		this.props.updateSegment(segment);
		e.target.reset(); 
	},

	render() {
		var fieldNumber = this.props.fieldNumber;
		var displayNumber = parseInt(fieldNumber) + 1;
		var segment = this.props.segment;
		console.log("fieldNumber", fieldNumber);
		var subFields = segment.fields[fieldNumber].subfields.map(function(subField, index) {
			return <li key={index+1} className="list-group-item">{index+1}: {subField.description}</li>;
		});
		console.log(segment.fields[fieldNumber].subfields);
		return (
			<div>
				<h3>{segment.name} - {displayNumber}</h3>
				<form onSubmit={this.addSubField}>
					<input type="text" placeholder="Add SubField" ref="subFieldDescription" />
					<input type="submit" value="Add" />
				</form>
				<ul className="list-group">
					{subFields}
				</ul>
			</div>
		)
	}
});
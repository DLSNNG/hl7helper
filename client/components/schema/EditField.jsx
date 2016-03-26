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

	removeSubField(subfield) {

		var segment = this.props.segment;
		var fieldNumber = this.props.fieldNumber;
		var subFieldIndex = subfield;
		var field =	segment.fields[fieldNumber];
			field.subfields.splice(subFieldIndex, 1);
		this.props.updateSegment(segment);
		console.log("removing subfield", subFieldIndex);

	},

	editSubField(subfield) {
		console.log("edited");
	},

	updateSubFields(subfields) {
		var segment = this.props.segment;
		var fieldNumber = this.props.fieldNumber;
		var field = segment.fields[fieldNumber];
			field.subfields = subfields;
		this.props.updateSegment(segment);
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
				<li key={index+1} className="list-group-item">
					{display} <div data-index={index} className="glyphicon glyphicon-remove pull-right" onClick={self.removeSubField}></div>
				</li>
			)
		});
		console.log(segment.fields[fieldNumber].subfields);
		return (
			<div>
				<h3>{segment.name} - {displayNumber}</h3>
				<form onSubmit={this.addSubField}>
					<div className="form-group">
						<div className="input-group">
							<input type="text" placeholder="Add SubField" ref="subFieldDescription" className="form-control" />
							<div className="input-group-btn">
								<button className="btn btn-primary">
									<span className="glyphicon glyphicon-plus"></span>
								</button>
							</div>
						</div>
					</div>
				</form>
				<SegmentList 
					fields={self.props.segment.fields[self.props.fieldNumber].subfields}
					editField={self.editSubField}
					removeField={self.removeSubField}
					onChange={self.updateSubFields} />
			</div>
		)
	}
});
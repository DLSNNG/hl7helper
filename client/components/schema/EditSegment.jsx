EditSegment = React.createClass({

	propTypes: {
		segment: React.PropTypes.object,
		updateSegment: React.PropTypes.func,
		editField: React.PropTypes.func
	},

	addField(e) {
		e.preventDefault();

		var segmentName = this.props.segment.name;
		var field = new Models.Field();
			field.description = this.refs.fieldDescription.value;
		var segment = new Models.Segment();
			segment.name = this.props.segment.name;
			segment.fields = this.props.segment.fields;
			segment.addField(field);
		this.props.updateSegment(segment);
		e.target.reset(); 
	},

	editField(field) {
		this.props.editField(field);
	},

	removeField(field) {

		var segment = this.props.segment;
		var fieldIndex = field;
			segment.fields.splice(fieldIndex, 1);
			this.props.updateSegment(segment);

	},

	updateSegment(fields){
		var segment = this.props.segment;
			segment.fields = fields;
			this.props.updateSegment(segment);
	},

	render() {
		var self=this;
		return (
			<div>
				<h3>{this.props.segment.name}</h3>
				<form onSubmit={this.addField}>
					<div className="form-group">
						<div className="input-group">
							<input type="text" placeholder="Add Field" ref="fieldDescription" className="form-control"/>
							<div className="input-group-btn">
								<button className="btn btn-primary">
									<span className="glyphicon glyphicon-plus"></span>
								</button>
							</div>
						</div>
					</div>
				</form>
				<SegmentList 
					fields={self.props.segment.fields}
					editField={self.editField}
					removeField={self.removeField}
					onChange={self.updateSegment}
					className="list-hover" />
			</div>
		)
	}
});
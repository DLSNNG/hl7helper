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

	editField(e) {
		e.preventDefault();
		var field = e.target.dataset.value;
		this.props.editField(field)
		console.log("field clicked", field);
	},

	render() {
		var self=this;
		var fields = this.props.segment.fields.map(function(field, index) {
			return <li data-value={index} onClick={self.editField} key={index+1} className="list-group-item">{index+1}: {field.description}</li>;
		});
		console.log(this.props.segment.fields);
		return (
			<div>
				<h3>{this.props.segment.name}</h3>
				<form onSubmit={this.addField}>
					<input type="text" placeholder="Add Field" ref="fieldDescription" />
					<input type="submit" value="Add" />
				</form>
				<ul className="list-group">
					{fields}
				</ul>
			</div>
		)
	}
});
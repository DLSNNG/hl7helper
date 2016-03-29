MessageViewer = React.createClass({

	propTypes: {
		message: React.PropTypes.string,
		schema: React.PropTypes.object
	},

	getInitialState() {
		var message = new Models.Message(this.props.message);
		return {
			message: message,
			selectedSegment: false,
			selectedField: false
		}
	},

	clearSelected(e) {
		e.preventDefault();
		this.setState({ selectedSegment: false, selectedField: false});
	},

	clearSelectedField(e) {
		e.preventDefault();
		this.setState({ selectedField: false });
	},

	selectSegment(e) {
		e.preventDefault();
		var index = e.target.dataset.index;
		this.setState({ selectedSegment: index, selectedField: false});
		console.log("selected segment", index);
	},

	selectField(e) {
		e.preventDefault();
		var index = e.target.dataset.index;
		this.setState({ selectedField: index });
		console.log("selected field", index);
	},

	renderSegments() {
		var self = this;
		var segmentNodes = this.state.message.segments.map(function(segment, index) {
			return (
				<li 
					className="list-group-item list-hover"
					onClick={self.selectSegment} 
					key={index} 
					data-index={index}>
					{segment.header}
				</li>
			)
		});
		console.log("segmentNodes", segmentNodes);
		return(
			<ul className="list-group">
				{segmentNodes}
			</ul>
		)
	},

	renderSelectedSegment() {
		var self = this;
		var schema = this.props.schema;
		var segment = this.state.message.segments[this.state.selectedSegment]
		var header = segment.header;

		var fieldNodes = segment.fields.map(function(field, index) {
			var ind = index + 1;
			var segments = schema.segments ? schema.segments : {};
			var fields = segments[header] ? segments[header].fields : {};
			var schemaSegment = fields[index] ? fields[index] : {};
			var description = fields[index] ? fields[index].description : "";

			return(
				<tr key={"field"+ind}>
					<td>{ind}</td>
					<td>{description}</td>
					<td data-index={index} onClick={self.selectField} className="list-hover">{field.value}</td>
				</tr>
			)
		});
		return (
			<div>
				<button onClick={self.clearSelected} className="btn btn-link pull-right">
					<span className="glyphicon glyphicon-chevron-left"></span> Segments
				</button>
				<h1>{header}</h1>
				<table className="table">
					<thead>
						<tr>
							<th>Piece</th>
							<th>Description</th>
							<th>Value</th>
						</tr>
					</thead>
					<tbody>
						{fieldNodes}
					</tbody>
				</table>
			</div>
		)
	},

	renderSelectedField() {
		var self = this;
		var schema = this.props.schema;
		var segmentIndex = this.state.selectedSegment;
		var fieldIndex = this.state.selectedField;
		var segment = this.state.message.segments[segmentIndex];
		var field = segment.fields[fieldIndex];
		var header = segment.header;
		var displayHeader = segment.header + " - " + (parseInt(fieldIndex) + 1).toString();

		var subfieldNodes = field.subfields.map(function(subfield, index) {
			var ind = index + 1;
			var segments = schema.segments ? schema.segments : {};
			var fields = segments[header] ? segments[header].fields : {};
			var subfields = fields[fieldIndex] ? fields[fieldIndex].subfields : {};
			var description = subfields[index] ? subfields[index].description : "";

			return(
				<tr key={"subfield"+ind}>
					<td>{ind}</td>
					<td>{description}</td>
					<td>{subfield}</td>
				</tr>
			)
		});
		return (
			<div>
				<button onClick={self.clearSelectedField} className="btn btn-link pull-right">
					<span className="glyphicon glyphicon-chevron-left"></span> {header}
				</button>
				<h1>{displayHeader}</h1>
				<table className="table">
					<thead>
						<tr>
							<th>Piece</th>
							<th>Description</th>
							<th>Value</th>
						</tr>
					</thead>
					<tbody>
						{subfieldNodes}
					</tbody>
				</table>
			</div>
		)
	},

	render() {
		if(this.state.selectedField) {
			return (
				<div className="container">
					{this.renderSelectedField()}
				</div>
			)
		}
		else if(this.state.selectedSegment) {
			return (
				<div className="container">
					{this.renderSelectedSegment()}
				</div>
			)
		}
		else {
			return (
				<div className="container">
					{this.renderSegments()}
				</div>
			)
		}
		
	}
});
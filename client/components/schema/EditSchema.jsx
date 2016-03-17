EditSchema = React.createClass({

	propTypes: {
		schema: React.PropTypes.object
	},

	getInitialState() {
		return {
			schema: new Models.Schema(this.props.schema),
			selectedSegment: false,
			selectedField: false,
		}
	},

	addSegment(e) {
		e.preventDefault();

		var schema = this.state.schema;
		var segment = new Models.Segment();
			segment.name = this.refs.segmentName.value;
			schema.addSegment(segment);

		this.setState({ schema: schema });
			schema.save();
		e.target.reset();
	},

	editSegment(e) {
		e.preventDefault();
		console.log(this.state.schema);
		var segment = this.state.schema.segments[e.target.dataset.value];
		console.log(segment);
		this.setState({ selectedSegment: segment, selectedField: false });
	},

	editField(field) {
		console.log("field assigned", field);
		this.setState({ selectedField: field });

	},

	updateSegment(segment) {
		var schema = this.state.schema;
		var segmentName = segment.name;
			schema.segments[segmentName] = segment;
			schema.save();
			this.setState({schema: schema});
			console.log(schema);
	},

	renderSegments() {
		var gridSize = this.state.selectedSegment ? "col-md-4" : "col-md-12";
		var self = this;
		var schemaNodes = Object.keys(this.state.schema.segments).map(function(key) {
			return <li onClick={self.editSegment} data-value={key} className="list-group-item" key={key}>{key}</li>
		});
		return(
			<div className={gridSize}>
				<h3>{this.state.schema.name}</h3>
				<form onSubmit={this.addSegment}>
					<input type="text" ref="segmentName" />
					<input type="submit" value="Add" />
				</form>
				<ul className="list-group">
					{schemaNodes}
				</ul>
			</div>
		)
	},

	renderSelectedSegment() {
		if(this.state.selectedSegment) {
			return (
				<div className="col-md-4">
					<EditSegment segment={this.state.selectedSegment} 
						updateSegment={this.updateSegment} 
						editField={this.editField}/>
				</div>
			)
		}
		else {
			return (<div></div>)
		}
	},

	renderSelectedField() {
		if(this.state.selectedField) {
			return (
				<div className="col-md-4">
					<EditField 
						segment={this.state.selectedSegment} 
						updateSegment={this.updateSegment} 
						fieldNumber={this.state.selectedField}/>
				</div>
			)
		}
		else {
			return (<div></div>)
		}
	},

	render() {
		return (
			<div className="container">
				{this.renderSegments()}
				{this.renderSelectedSegment()}
				{this.renderSelectedField()}
			</div>
		)
	}
});
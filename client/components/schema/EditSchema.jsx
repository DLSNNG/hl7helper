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

	removeSegment(e) {

		e.preventDefault;
		var schema = this.state.schema;
		var segment = this.toBeRemoved;
		delete schema.segments[segment];
		schema.save();
		this.setState({ schema: schema, askRemove:false, selectedSegment: false, selectedField:false });

	},

	askRemoveSegment(e) {
		e.preventDefault;
		this.toBeRemoved = e.target.dataset.value;
		console.log(this.toBeRemoved);
		this.setState({ askRemove: true });
	},

	cancelRemoveSegment(e) {
		e.preventDefault();
		this.toBeRemoved = false;
		this.setState({ askRemove:false });
	},

	editSegment(e) {
		e.preventDefault();
		var segment = this.state.schema.segments[e.target.dataset.value];
		this.setState({ selectedSegment: segment, selectedField: false });
	},

	editField(field) {
		this.setState({ selectedField: field });
		console.log("selected field", field);
	},

	updateSegment(segment) {
		var schema = this.state.schema;
		var segmentName = segment.name;
			schema.segments[segmentName] = segment;
			schema.save();
			this.setState({schema: schema});
	},

	renderSegments() {
		var gridSize = this.state.selectedSegment ? "col-md-4" : "col-md-12";
		var self = this;
		var schemaNodes = Object.keys(this.state.schema.segments).map(function(key) {
			return (
				<li onClick={self.editSegment} data-value={key} className="list-group-item" key={key}>
					{key} <div data-value={key} className="glyphicon glyphicon-remove pull-right" onClick={self.askRemoveSegment}></div>
				</li>
			)
		});
		return(
			<div className={gridSize}>
				<h3>{this.state.schema.name}</h3>
				<form onSubmit={this.addSegment}>
					<input type="text" ref="segmentName" />
					<input type="submit" value="Add" />
				</form>
				<ul className="list-group widget">
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

	renderAskRemove() {
		return (
			<div className="jumbotron">
				<h2>Remove Segment {this.toBeRemoved}?</h2>
				<button className="btn btn-info" onClick={this.cancelRemoveSegment}>
					Cancel
				</button>
				<button className="btn btn-danger" onClick={this.removeSegment}>
					Remove
				</button>
			</div>
		)
	},

	render() {
		console.log("props", this.state.schema._id);
		var href = "/work/schema/" + this.state.schema._id;
		if(this.state.askRemove) {
			return (
				<div className="container">
					{this.renderAskRemove()}
				</div>
			)
		}
		else {
			return (
				<div className="container">
					<div className="row">
						<a href={href} className="pull-right">
							<button className="btn btn-info">Test Space</button>
						</a>
					</div>
					{this.renderSegments()}
					{this.renderSelectedSegment()}
					{this.renderSelectedField()}
				</div>
			)
		}
	}
});
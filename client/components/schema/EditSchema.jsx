EditSchema = React.createClass({

	propTypes: {
		schema: React.PropTypes.object
	},

	getInitialState() {
		return {
			schema: new Models.Schema(this.props.schema),
			selectedSegment: false,
			selectedField: false,
			askRemove: false
		}
	},

	componentWillReceiveProps(nextProps) {
		this.setState({ schema: nextProps.schema });
	},

	addSegment(e) {
		e.preventDefault();
		var segmentName = this.refs.segmentName.value.trim();
		if(segmentName == "") { return false; } //don't allow blank fields
		var schema = this.state.schema;
		var segment = new Models.Segment();
			segment.name = segmentName;
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

	deleteSchema() {
		var schema = this.state.schema;
			schema.remove();
		FlowRouter.go('/schema');
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

	copySchema(newName) {
		var doc = { name: newName, segments: this.props.schema.segments };
		Meteor.call("saveSchema", doc, function(error, schemaID) {
			if(error) { console.log("ERROR", error); }
			else { FlowRouter.go("/schema/"+schemaID); }
		});
	},

	renderSegments() {
		var gridSize = this.state.selectedSegment ? "col-md-4" : "col-md-12";
		var self = this;
		var schemaNodes = Object.keys(this.state.schema.segments).map(function(key) {
			return (
				<li onClick={self.editSegment} data-value={key} className="list-group-item list-hover" key={key}>
					{key} <div data-value={key} className="glyphicon glyphicon-remove pull-right list-remove" onClick={self.askRemoveSegment}></div>
				</li>
			)
		});
		return(
			<div className={gridSize}>
				<h3>{this.state.schema.name}</h3>
				<form onSubmit={this.addSegment}>
					<div className="form-group">
						<div className="input-group">
							<input type="text" ref="segmentName" placeholder="Add Segment" className="form-control" />
							<div className="input-group-btn">
								<button className="btn btn-primary">
									<span className="glyphicon glyphicon-plus"></span>
								</button>
							</div>
						</div>
					</div>
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
				<div className="col-md-4 edit-widget">
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
				<div className="col-md-4 edit-widget">
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
		if(this.state.askDelete) {
			return (
				<div className="container">
					{this.renderAskDelete()}
				</div>
			)
		}
		else if(this.state.askRemove) {
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
						<ModalDiv
							buttonText=""
							buttonClass="glyphicon glyphicon-duplicate pull-left"
							modalId="copySchema"
							modalTitle="Rename New Schema"
							modalText="Please select a new name for the copied Schema"
							modalInput="New Name"
							onSubmit={this.copySchema} />
						<ModalDiv
							buttonText=""
							buttonClass="glyphicon glyphicon-remove pull-right delete-schema"
							modalId="deleteSchema"
							modalTitle="Delete Schema"
							modalText="Are you sure you want to delete this schema?"
							submitText="Delete"
							onSubmit={this.deleteSchema} />
					</div>
					<div className="row">
						{this.renderSegments()}
						{this.renderSelectedSegment()}
						{this.renderSelectedField()}
					</div>
					<div className="col-md-12">
						<a href={href} className="pull-right">
							<button className="btn btn-info">Test Space</button>
						</a>
					</div>
				</div>
			)
		}
	}
});
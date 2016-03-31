ViewSchema = React.createClass({

	propTypes: {
		schema: React.PropTypes.object,
		isFavorite: React.PropTypes.bool,
		loggedIn: React.PropTypes.bool
	},

	getInitialState() {
		return {
			schema: new Models.Schema(this.props.schema),
			selectedSegment: false,
			selectedField: false
		}
	},

	selectSegment(e) {
		e.preventDefault();
		var segment = this.state.schema.segments[e.target.dataset.value];
		this.setState({ selectedSegment: segment, selectedField: false });
	},

	selectedField(field) {
		this.setState({ selectedField: field });
		console.log("selected field", field);
	},

	toggleFavorite(e) {
		e.preventDefault();
		Meteor.call("toggleSchemaFavorite", this.props.schema, function(error, response) {
			if(error) { console.log("ERROR", error); }
			else { console.log("Toggled Schema", response); }
		});
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
				<li onClick={self.selectSegment} data-value={key} className="list-group-item list-hover" key={key}>
					{key}
				</li>
			)
		});
		return(
			<div className={gridSize}>
				<h3>{this.state.schema.name}</h3>
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
					<ViewSegment 
						segment={this.state.selectedSegment}
						selectField={this.selectedField} />
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
					<ViewField 
						segment={this.state.selectedSegment} 
						fieldNumber={this.state.selectedField}/>
				</div>
			)
		}
		else {
			return (<div></div>)
		}
	},

	renderFavoritesButton() {
		if (this.props.loggedIn) {
			var className = this.props.isFavorite ? "glyphicon glyphicon-star" : "glyphicon glyphicon-star-empty";
				className = "pull-right favorite " + className;
			return (
				<span className={className} onClick={this.toggleFavorite}></span>
			)
		}
		else {
			return false;
		}
	},

	render() {
		console.log("props", this.state.schema._id);
		var href = "/work/schema/" + this.state.schema._id;
		return (
			<div className="container">
				<div className="row">
					{this.renderFavoritesButton()}
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
					<ModalButton
						buttonText="Copy Schema"
						buttonClass="btn btn-warning"
						modalId="copySchema"
						modalTitle="Rename Schema"
						modalText="Please select a new name for the copied Schema"
						modalInput="New Name"
						onSubmit={this.copySchema} />

				</div>
			</div>
		)
	}
});
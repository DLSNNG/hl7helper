ViewSchema = React.createClass({

	propTypes: {
		schema: React.PropTypes.object
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

	renderSegments() {
		var gridSize = this.state.selectedSegment ? "col-md-4" : "col-md-12";
		var self = this;
		var schemaNodes = Object.keys(this.state.schema.segments).map(function(key) {
			return (
				<li onClick={self.selectSegment} data-value={key} className="list-group-item" key={key}>
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

	render() {
		console.log("props", this.state.schema._id);
		var href = "/work/schema/" + this.state.schema._id;
		return (
			<div className="container">
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
});
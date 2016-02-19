EditSchema = React.createClass({

	propTypes: {
		schema: React.PropTypes.object
	},

	getInitialState() {
		return {
			schema: new Models.Schema(this.props.schema)
		}
	},

	addSegment(e) {
		e.preventDefault();

		var schema = this.state.schema;
		var segment = new Models.Segment();
			segment.name = this.refs.segmentName.value;
			schema.addSegment(segment);

		this.setState({ schema: schema });
		e.target.reset();
	},

	saveSchema() {
		var schema = this.state.schema;
			schema.save();
	},

	render() {
		var schemaNodes = Object.keys(this.state.schema.segments).map(function(key) {
			return <div key={key}>{key}</div>
		});

		return (
			<div className="container">
				<h3>{this.state.schema.name}</h3>
				<form onSubmit={this.addSegment}>
					<input type="text" ref="segmentName" />
					<input type="submit" value="Add" />
				</form>
				<input type="submit" value="save" onClick={this.saveSchema} />
				{schemaNodes}
			</div>
		)
	}
});
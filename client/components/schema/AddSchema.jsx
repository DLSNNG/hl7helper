AddSchema = React.createClass({

	addSchema(e) {
		e.preventDefault();
		var schema = new Models.Schema();
			schema.name = this.refs.schemaName.value;
			schema.save();
		e.target.reset();
	},

	render() {
		return (
			<div className="container">
				<form onSubmit={this.addSchema}>
					<input type="text" ref="schemaName" />
					<input type="submit" value="Add" />
				</form>
			</div>
		)
	}
});
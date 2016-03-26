AddSchema = React.createClass({
	
	mixins: [ReactMeteorData],

	getMeteorData() {
		var user = Meteor.userId();
		return {
			user: user
		}
	},

	addSchema(e) {
		e.preventDefault();
		var schema = new Models.Schema();
			schema.name = this.refs.schemaName.value;
			schema.save();
		e.target.reset();
		console.log("schema created", schema);
	},

	render() {
		if(this.data.user) {
			var query = { creator: Meteor.userId() };
			return (
				<div>
					<div className="container">
						<h2>Schemas</h2>
						<form onSubmit={this.addSchema}>
							<div className="form-group">
								<div className="input-group">
									<input type="text" ref="schemaName" className="form-control" placeholder="Add Schema"/>
									<div className="input-group-btn">
										<button className="btn btn-primary">
											<span className="glyphicon glyphicon-plus"></span>
										</button>
									</div>
								</div>
							</div>
						</form>
						<CollectionList
						collection="Schemas"
						display="name"
						baseURL="/schema/"
						query={query} />
					</div>			
				</div>
			)
		}
		else {
			return (
				<div className="container">You must be logged in to create and/or view your schemas</div>
			)
		}
		
	}
});
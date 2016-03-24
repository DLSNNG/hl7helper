EditSchemaPage = React.createClass({

	propTypes: {
		schema: React.PropTypes.string
	},
	
	mixins: [ReactMeteorData],

	getMeteorData() {
		var handle = Meteor.subscribe("schemas");
		var loading = !handle.ready();
		var schema = Collections.Schemas.findOne({ _id: this.props.schema, creator: Meteor.userId() });
		return {
			loading: loading,
			schema: schema
		}
	},

	render() {
		if(this.data.loading) {
			return <LoadingSpinner />
		}
		else if(!this.data.schema) {
			return (
				<div className="container">
					You do not have permission to edit this schema.
				</div>
			)
		}
		else {
			return (
				<EditSchema schema={this.data.schema} />
			)
		}
	}
});
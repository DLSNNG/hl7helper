EditSchemaPage = React.createClass({

	propTypes: {
		schema: React.PropTypes.string
	},
	
	mixins: [ReactMeteorData],

	getMeteorData() {
		var handle = Meteor.subscribe("schemas");
		var loading = !handle.ready();
		var editSchema = Collections.Schemas.findOne({ _id: this.props.schema, creator: Meteor.userId() });
		var viewSchema = Collections.Schemas.findOne({ _id: this.props.schema });
		return {
			loading: loading,
			editSchema: editSchema,
			viewSchema: viewSchema
		}
	},

	render() {
		if(this.data.loading) {
			return <LoadingSpinner />
		}
		else if(this.data.editSchema) {
			return (
				<EditSchema schema={this.data.editSchema} />
			)
		}
		else {
			return (
				<ViewSchema schema={this.data.viewSchema} />
			)
		}
	}
});
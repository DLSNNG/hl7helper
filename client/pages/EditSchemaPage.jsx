EditSchemaPage = React.createClass({

	propTypes: {
		schema: React.PropTypes.string
	},
	
	mixins: [ReactMeteorData],

	getMeteorData() {
		return {
			schema: Collections.Schemas.findOne({ _id: this.props.schema })
		}
	},

	render() {
		return (
			<EditSchema schema={this.data.schema} />
		)
	}
});
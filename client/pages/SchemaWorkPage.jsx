SchemaWorkPage = React.createClass({

	propTypes: {
		schema: React.PropTypes.string
	},
	
	mixins: [ReactMeteorData],

	getMeteorData() {
		var handle = Meteor.subscribe("schemas");
		return {
			loading: !handle.ready(),
			schema: Collections.Schemas.findOne({ _id: this.props.schema })
		}
	},

	getInitialState() {
		return{
			message: ""
		}
	},

	updateMessage() {
		var message = this.refs.message.value;
		console.log("message", message);
		this.setState({ message: message });
	},

	clearMessage() {
		this.setState({ message: "" });
	},

	renderView() {
		if(this.state.message.length > 0){
			return (
				<div className="container">
					<div className="row">
						<h2>{this.data.schema.name}</h2>
					</div>
					<MessageViewer message={this.state.message} schema={this.data.schema}/>
					<div className="row">
						<button className="btn btn-warning col-xs-12" onClick={this.clearMessage}>
							<span className="glyphicon glyphicon-chevron-left"></span>New Message
						</button>
					</div>
				</div>
			)
		}
		else {
			return (
				<div className="container">
					<div className="row">
						<h2>{this.data.schema.name}</h2>
					</div>
					<div className="row">
						<textArea
							ref="message"
							className="col-xs-12"
							rows="15"
							placeholder="Place HL7 Segment here" />
						<input onClick={this.updateMessage} type="submit" value="Submit" className="btn btn-primary col-xs-12" />
					</div>
				</div>
			)
		}
	},

	render() {
		if(this.data.loading) {
			return <LoadingSpinner />
		}
		else {
			return this.renderView()
		}
	}
});
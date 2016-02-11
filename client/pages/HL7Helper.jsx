HL7Helper = React.createClass({

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

	render() {
		if(this.state.message.length > 0){
			return (
				<div className="container">
					<div className="row">
						<button className="pull-right" onClick={this.clearMessage}>
							<span className="glyphicon glyphicon-plus"></span>New Message
						</button>
					</div>
					<Segments message={this.state.message} />
				</div>
			)
		}
		else {
			return (
				<div className="container">
					<textArea
						ref="message"
						className="col-xs-12"
						rows="15" />
					<input onClick={this.updateMessage} type="submit" value="Submit" />
				</div>
			)
		}
	}
});
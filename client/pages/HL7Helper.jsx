HL7Helper = React.createClass({

	getInitialState() {
		return{
			message: "",
			schema: {}
		}
	},

	selectSchema(schema) {
		this.setState({ schema: schema });
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
					<div className="col-md-2">
						<CollectionDropdown
							collection="Schemas"
							display="name"
							value="_id"
							placeholder="Select schema"
							onChange={this.selectSchema}
							ref="schema" />
					</div>
					<div className="col-md-10">
						<div className="row">
							<button className="pull-right" onClick={this.clearMessage}>
								<span className="glyphicon glyphicon-plus"></span>New Message
							</button>
						</div>
						<Segments message={this.state.message} schema={this.state.schema} />
					</div>
				</div>
			)
		}
		else {
			return (
				<div className="container">
					<div className="col-md-2">
						<CollectionDropdown
							collection="Schemas"
							display="name"
							value="_id"
							placeholder="Select schema"
							onChange={this.selectSchema}
							ref="schema" />
					</div>
					<div className="col-md-10">
						<textArea
							ref="message"
							className="col-xs-12"
							rows="15" />
						<input onClick={this.updateMessage} type="submit" value="Submit" />
					</div>
				</div>
			)
		}
	}
});
Segment = React.createClass({

	propTypes: {
		segment: React.PropTypes.string,
		index: React.PropTypes.number,
		schema: React.PropTypes.object
	},

	getInitialState() {
		return {
			showFields: false
		}
	},

	toggleShown() {
		var shown = this.state.showFields;
		this.setState({ showFields: !shown });
	},

	stopPropagation(event) {
		event.stopPropagation();
	},

	renderWithFields() {
		return (
			<div className="modal-backdrop" onClick={this.toggleShown}>
				<div className="modal-inner" onClick={this.stopPropagation}>
					<span className="glyphicon glyphicon-remove pull-right red" onClick={this.toggleShown}></span>
					<Fields segment={this.props.segment} schema={this.props.schema} />
				</div>
			</div>
		)
	},

	renderWithoutFields() {
		return (
			<div>
				<span>{this.props.index}: </span><span onClick={this.toggleShown}>{this.props.segment}</span>
			</div>
		)
	},

	render() {
		if(this.state.showFields) {
			return this.renderWithFields()
		}
		else {
			return this.renderWithoutFields()
		}
	}
});
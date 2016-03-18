Field = React.createClass({

	propTypes: {
		field: React.PropTypes.string,
		schema: React.PropTypes.object
	},

	getInitialState() {
		return {
			showSubFields: false
		}
	},

	toggleShown() {
		var shown = this.state.showSubFields;
		this.setState({ showSubFields: !shown });
	},
	
	parseSubFields() {
		var field = this.props.field;
		var subFields = field.split('^');
		return subFields;
	},

	renderSubFields() {
		if(this.state.showSubFields) {
			var subFields = this.parseSubFields();
			console.log("subfields", subFields);
			var self = this;
			var subFieldNodes = subFields.map(function(field, index) {
				var ind = index + 1;
				var schemaSubfields = self.props.schema.subfields ? self.props.schema.subfields : {};
				var description = schemaSubfields[index] ? schemaSubfields[index].description : "";
				return(
					<tr key={"field"+ind}>
						<td>{ind}</td>
						<td>{field}</td>
						<td>{description}</td>
					</tr>
				)
			})
			return subFieldNodes;
		}
		else {
			return <tr></tr>
		}
		
	},

	render() {
		return (
			<div>
				<div onClick={this.toggleShown}>
					{this.props.field}
				</div>
				<table className="table">
					<tbody>
						{this.renderSubFields()}
					</tbody>
				</table>
			</div>
		)
	}
});
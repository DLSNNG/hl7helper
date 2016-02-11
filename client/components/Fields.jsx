Fields = React.createClass({

	propTypes: {
		segment: React.PropTypes.string
	},
	
	parseFields() {
		var segment = this.props.segment;
		var fields = segment.split('|');
		var header = fields[0];
			fields.shift();
		var fieldsObj = {
			header: header,
			fields: fields
		}
		return fieldsObj;
	},

	renderFields() {
		var fieldsObj = this.parseFields();
		var fields = fieldsObj.fields;
		console.log("fields", fields);
		var fieldNodes = fields.map(function(field, index) {
			var ind = index + 1;
			return(
				<tr key={"field"+ind}>
					<td>{ind}</td>
					<td>{field}</td>
				</tr>
			)
		})
		return fieldNodes;
	},

	render() {
		var header = this.parseFields().header;
		return (
			<div className="inheritDimensions">
				<h3>{header}</h3>
				<div className="scrollable">
					<table className="table">
						{this.renderFields()}
					</table>
				</div>
			</div>
		)
	}
});
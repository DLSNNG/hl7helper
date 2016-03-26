/*Fields = React.createClass({

	propTypes: {
		segment: React.PropTypes.string,
		schema: React.PropTypes.object
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
		var header = fieldsObj.header;
		var schema = this.props.schema;
		var self = this;
		var fieldNodes = fields.map(function(field, index) {
			var ind = index + 1;
			var segments = schema.segments ? schema.segments : {};
			var fields = segments[header] ? segments[header].fields : {};
			var schemaSegment = fields[index] ? fields[index] : {};
			var description = fields[index] ? fields[index].description : "";

			return(
				<tr key={"field"+ind}>
					<td>{ind}</td>
					<td>{description}</td>
					<td><Field field={field} schema={schemaSegment}/></td>
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
						<thead>
							<tr>
								<th>Piece</th>
								<th>Description</th>
								<th>Value</th>
							</tr>
						</thead>
						<tbody>
							{this.renderFields()}
						</tbody>
					</table>
				</div>
			</div>
		)
	}
});*/
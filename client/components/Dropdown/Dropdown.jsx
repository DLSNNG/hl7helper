Dropdown = React.createClass({

	propTypes: {
		items: React.PropTypes.array,
		display: React.PropTypes.string,
		value: React.PropTypes.string,
		keyToUse: React.PropTypes.string,
		name: React.PropTypes.string,
		placeholder: React.PropTypes.string,
		selected: React.PropTypes.string,
		onChange: React.PropTypes.func
	},

	renderPlaceholder() {
		return <option value="">{this.props.placeholder || ""}</option>
	},

	renderOptions() {
		return this.props.items.map( (item) => {
			return (
				<option key={item[this.props.keyToUse]} value={item[this.props.value]}>
					{item[this.props.display]}
				</option>
			) 
				
		})
	},

	render() {
		return (
			<select onChange={this.props.onChange} name={this.props.name} defaultValue={this.props.selected || ""}>
				{this.renderPlaceholder()}
				{this.renderOptions()}
			</select>
		)
	}
});
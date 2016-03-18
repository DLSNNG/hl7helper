CollectionDropdown = React.createClass({

	propTypes: {
		subscribeTo: React.PropTypes.string,
		collection: React.PropTypes.string,
		display: React.PropTypes.string,
		value: React.PropTypes.string,
		placeholder: React.PropTypes.string,
		onChange: React.PropTypes.func
	},

	mixins: [ReactMeteorData],

	getMeteorData() {
		Meteor.subscribe(this.props.subscribeTo || this.props.collection.toLowerCase());
		return {
			collection: Collections[this.props.collection].find({}).fetch()
		}
	},

	getInitialState() {
		var selected = this.props.selected || "";
		return {
			selected: selected
		}
	},

	updateSelected(event) {
		var selected = event.target.value;
		this.setState({ selected: selected });
		var schema = Collections[this.props.collection].findOne({ _id: selected });
		this.props.onChange(schema);
	},

	getValue() {
		return this.state.selected;
	},

	render() {
		return (
			<Dropdown 
				items={this.data.collection}
				keyToUse="_id"
				display={this.props.display}
				name={this.props.collection}
				value={this.props.value} 
				onChange={this.updateSelected}
				placeholder={this.props.placeholder}
				selected={this.props.selected} />
		)
	}
});
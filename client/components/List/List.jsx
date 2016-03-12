List = React.createClass({
	propTypes: {
		items: React.PropTypes.array,
		keyToUse: React.PropTypes.string,
		display: React.PropTypes.string,
		baseURL: React.PropTypes.string
	},
	renderList() {
		return this.props.items.map((item) => {
	      return <ListItem 
	      			key={item[this.props.keyToUse]} 
	      			display={item[this.props.display]} 
	      			url={this.props.baseURL ? this.props.baseURL+item._id : null} />;
	    });
	},
	render() {
		return (
			<ul className="list-group">
				{this.renderList()}
			</ul>
		)
	}
});
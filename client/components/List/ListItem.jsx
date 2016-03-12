ListItem = React.createClass({
	propTypes: {
		display: React.PropTypes.string,
		url: React.PropTypes.string
	},
	render() {
		if (this.props.url) {
			return (
				<a href={this.props.url}>
					<li className="list-group-item">
						{this.props.display}
					</li>
				</a> 
			)
		}
		else {
			return (
				<li className="list-group-item">
					{this.props.display}
				</li>
			)
		}
		
	}
});
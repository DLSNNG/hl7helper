EditSegment = React.createClass({

	propTypes: {
		
	},
	
	mixins: [ReactMeteorData],

	getMeteorData() {
		return {
			dataName: Collections.Collection.find({}).fetch()
		}
	},

	render() {
		return (
			<div className="container">
				dataName
			</div>
		)
	}
});
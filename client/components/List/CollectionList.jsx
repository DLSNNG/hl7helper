CollectionList = React.createClass({

	propTypes: {
		subscribeTo: React.PropTypes.string,
		collection: React.PropTypes.string,
		display: React.PropTypes.string,
		baseURL: React.PropTypes.string,
		query: React.PropTypes.object
	},

	mixins: [ReactMeteorData],

	getMeteorData() {
		var handle = Meteor.subscribe(this.props.subscribeTo || this.props.collection.toLowerCase());
		var loading = !handle.ready();
		console.log(loading);
		return {
			loading: loading,
			collection: Collections[this.props.collection].find(this.props.query || {}).fetch()
		}
	},

	render() {
		if(!this.data.loading) {
			return <LoadingSpinner />;
		}
		else {
			return (
				<List 
					items={this.data.collection}
					keyToUse="_id"
					display={this.props.display}
					baseURL={this.props.baseURL} />
			)
		}
	}
});
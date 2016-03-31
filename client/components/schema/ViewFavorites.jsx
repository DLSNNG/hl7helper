ViewFavorites = React.createClass({
	
	mixins: [ReactMeteorData],

	getMeteorData() {
		var schemaHandle = Meteor.subscribe("schemas");
		var favoritesHandle = Meteor.subscribe("favorites");
		var loading = !(schemaHandle.ready() && favoritesHandle.ready());
		var user = Meteor.userId();
		var favorites = Collections.Favorites.find({ user: user }).fetch().map(function(favorite) {
				return favorite.schema;
			});
		var favoriteSchemas = Collections.Schemas.find({ _id: { $in: favorites } }).fetch();
		return {
			user: user,
			favorites: favoriteSchemas
		}
	},

	addSchema(e) {
		e.preventDefault();
		var schema = new Models.Schema();
			schema.name = this.refs.schemaName.value;
			schema.save();
		e.target.reset();
		console.log("schema created", schema);
	},

	render() {
		console.log("favorites", this.data.favorites);
		if(this.data.user) {
			if(this.data.loading) {
				return (
					<LoadingSpinner />
				)
			}
			else {
				return (
					<div>
						<div className="container">
							<h2>Favorites</h2>
							<List
								items={this.data.favorites}
								keyToUse="name"
								display="name"
								baseURL="/schema/" />
						</div>			
					</div>
				)
			}
		}
		else {
			return (
				<div className="container">You must be logged in to view your Favorites.</div>
			)
		}
		
	}
});
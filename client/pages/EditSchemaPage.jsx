EditSchemaPage = React.createClass({

	propTypes: {
		schema: React.PropTypes.string
	},
	
	mixins: [ReactMeteorData],

	getMeteorData() {
		var schemaHandle = Meteor.subscribe("schemas");
		var favoritesHandle = Meteor.subscribe("favorites");
		var loading = !(schemaHandle.ready() && favoritesHandle.ready());
		var loggedIn = Meteor.userId() ? true : false;
		var editSchema = Collections.Schemas.findOne({ _id: this.props.schema, creator: Meteor.userId() });
		var viewSchema = Collections.Schemas.findOne({ _id: this.props.schema });
		var isFavorite = Collections.Favorites.findOne({ schema: this.props.schema, user: Meteor.userId() }) ? true : false;
		//add conditional logic to only show favorite icon if user is logged in.
		return {
			loading: loading,
			loggedIn: loggedIn,
			editSchema: editSchema,
			viewSchema: viewSchema,
			isFavorite: isFavorite
		}
	},

	componentWillreceiveProps(nextProps) {
		console.log("schema", this.data.editSchema);
	},

	render() {
		console.log("isFavorite", this.data.isFavorite);
		console.log("schemapage", this.props.schema);
		console.log("schemapagedata", this.data.editSchema);
		if(this.data.loading) {
			return <LoadingSpinner />
		}
		else if(this.data.editSchema) {
			console.log("schema passed to edit schema", this.data.editSchema);
			return (
				<EditSchema schema={this.data.editSchema} />
			)
		}
		else {
			return (
				<ViewSchema schema={this.data.viewSchema} isFavorite={this.data.isFavorite} loggedIn={this.data.loggedIn} />
			)
		}
	}
});
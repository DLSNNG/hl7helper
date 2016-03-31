FlowRouter.route('/', {
	action: function(params) {
		ReactLayout.render(MainLayout, { content: <HomePage /> });
	}
});

FlowRouter.route('/schema', {
	action: function(params) {
		ReactLayout.render(MainLayout, { content: <AddSchema /> });
	}
});

FlowRouter.route('/favorites', {
	action: function(params) {
		ReactLayout.render(MainLayout, { content: <ViewFavorites /> });
	}
});

FlowRouter.route('/schema/:schemaID', {
	action: function(params) {
		ReactLayout.render(MainLayout, { content: <EditSchemaPage schema={params.schemaID} /> });
	}
});

FlowRouter.route('/work/schema/:schemaID', {
	action: function(params) {
		ReactLayout.render(MainLayout, { content: <SchemaWorkPage schema={params.schemaID} /> });
	}
});
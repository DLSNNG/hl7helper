FlowRouter.route('/', {
	action: function(params) {
		ReactLayout.render(MainLayout, { content: <HomePage /> });
	}
});

FlowRouter.route('/segments', {
	action: function(params) {
		ReactLayout.render(MainLayout, { content: <HL7Helper /> });
	}
});

FlowRouter.route('/schema', {
	action: function(params) {
		ReactLayout.render(MainLayout, { content: <AddSchema /> });
	}
});

FlowRouter.route('/schema/:schemaID', {
	action: function(params) {
		ReactLayout.render(MainLayout, { content: <EditSchemaPage schema={params.schemaID} /> });
	}
});
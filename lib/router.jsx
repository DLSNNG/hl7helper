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
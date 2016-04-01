ModalDiv = React.createClass({

	propTypes: {
		buttonText: React.PropTypes.string,
		divClass: React.PropTypes.string,
		buttonClass: React.PropTypes.string,
		modalId: React.PropTypes.string,
		modalTitle: React.PropTypes.string,
		modalText: React.PropTypes.string,
		modalInput: React.PropTypes.string,
		submitText: React.PropTypes.string,
		cancelText: React.PropTypes.string,
		onSubmit: React.PropTypes.func
	},

	componentWillUnmount() {
		$("#" + this.props.modalId).modal('hide');
	},

	renderModalInput() {
		if (this.props.modalInput) {
			return (
				<form onSubmit={this.onSubmit}>
					<input 
						type="text" 
						placeholder={this.props.modalInput} 
						className="form-control" ref="input" />
				</form>
			)
		}
		else {
			return false;
		}
	},

	onSubmit(e) {
		e.preventDefault();
		if(this.props.modalInput) {
			var value = this.refs.input.value;
			this.props.onSubmit(value);
			$("#" + this.props.modalId).modal('hide');
		}
		else {
			this.props.onSubmit();
			$("#" + this.props.modalId).modal('hide');
		}
	},

	render() {
		var divClass = this.props.divClass || "";
		var btnClass = this.props.buttonClass || "btn btn-primary btn-lg";
		var cancelText = this.props.cancelText || "Close";
		var submitText = this.props.submitText || "Submit";
		return (
			<div className={divClass}>
				<div className={btnClass} data-toggle="modal" data-target={"#"+this.props.modalId}>
				  {this.props.buttonText}
				</div>

				<div className="modal fade" id={this.props.modalId} tabIndex="-1" role="dialog" aria-labelledby={this.props.modalId + "label"}>
				  <div className="modal-dialog" role="document">
				    <div className="modal-content">
				      <div className="modal-header">
				        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				        <h4 className="modal-title" id={this.props.modalId + "label"}>{this.props.modalTitle}</h4>
				      </div>
				      <div className="modal-body">
				        {this.props.modalText}
				        {this.renderModalInput()}
				      </div>
				      <div className="modal-footer">
				        <button type="button" className="btn btn-default" data-dismiss="modal">{cancelText}</button>
				        <button type="button" className="btn btn-primary" onClick={this.onSubmit}>{submitText}</button>
				      </div>
				    </div>
				  </div>
				</div>
			</div>
		)
	}
});
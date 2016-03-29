ViewSegmentList = React.createClass({
  propTypes:{
    fields: React.PropTypes.array,
    selectField: React.PropTypes.func,
    className: React.PropTypes.string
  },
  selectField(e) {
    e.preventDefault();
    var field = e.target.dataset.id;
        this.props.selectField(field);
  },
  renderArray(){
    var self = this;
    var className = this.props.className ? this.props.className : "";
        className = "list-group-item " + className;
    var fields = this.props.fields.map(function(field, index) {
      var display = (index+1).toString() + ": " + field.description;
      return (
        <li 
          key={index}
          data-id={index}
          onClick={self.selectField}
          className={className}>
          
          {display}
        </li>
      ) 
    }); 
    return fields;
  },
  render() {
    return (
      <ul className="list-group widget">
        {this.renderArray()}
      </ul>
    ) 
  } 
});
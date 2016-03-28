ViewSegmentList = React.createClass({
  propTypes:{
    fields: React.PropTypes.array,
    selectField: React.PropTypes.func
  },
  selectField(e) {
    e.preventDefault();
    var field = e.target.dataset.id;
        this.props.selectField(field);
  },
  renderArray(){
    var self = this;
    var fields = this.props.fields.map(function(field, index) {
      var display = (index+1).toString() + ": " + field.description;
      return (
        <li 
          key={index}
          data-id={index}
          onClick={self.selectField}
          className="list-group-item">
          
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
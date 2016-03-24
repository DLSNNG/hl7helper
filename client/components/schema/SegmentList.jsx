var placeholder = document.createElement("li");
placeholder.className = "placeholder";

SegmentList = React.createClass({
  propTypes:{
    fields: React.PropTypes.array,
    onChange: React.PropTypes.func,
    editField: React.PropTypes.func,
    removeField: React.PropTypes.func
  },
  getInitialState(){
    return {
      fields: this.props.fields 
    } 
  },
  componentWillReceiveProps(nextProps) {
    this.setState({fields: nextProps.fields});
  },
  dragStart(e){
      this.dragged = e.currentTarget;
      e.dataTransfer.effectAllowed = 'move';

      // Firefox requires calling dataTransfer.setData
      // for the drag to properly work
      e.dataTransfer.setData("text/html", e.currentTarget);
  },
  dragEnd(e) {
      this.dragged.style.display = "block";
      this.dragged.parentNode.removeChild(placeholder);

      // Update state
      var fields = this.state.fields;
      var from = Number(this.dragged.dataset.id);
      var to = Number(this.over.dataset.id);
      if(from < to) to--;
      if(this.nodePlacement == "after") to++;
      fields.splice(to, 0, fields.splice(from, 1)[0]);
      this.setState({fields: fields});
      this.props.onChange(this.state.fields);
      this.props.editField(to.toString()); // needs to be string so 0 isnt interpreted as false
  },
  dragOver(e){
      e.preventDefault();
      this.dragged.style.display = "none";
      if(e.target.className == "placeholder") return;
      this.over = e.target;
      
      var relY = e.clientY - this.over.getBoundingClientRect().top; //relative position in <li>

      var midPoint = this.over.offsetHeight / 2;
      var parent = e.target.parentNode;

      if(relY > midPoint) {
          this.nodePlacement = "after";
          parent.insertBefore(placeholder, e.target.nextElementSibling);
      }
      else if(relY < midPoint) {
          this.nodePlacement = "before"
          parent.insertBefore(placeholder, e.target);
      }
  },
  editField(e) {
    e.preventDefault();
    var field = e.target.dataset.id;
        this.props.editField(field);
  },
  removeField(e) {
    e.preventDefault();
    var field = e.target.dataset.index;
        this.props.removeField(field);
  },
  renderArray(){
    var self = this;
    var fields = this.state.fields.map(function(field, index) {
      var display = (index+1).toString() + ": " + field.description;
      return (
        <li 
          key={index}
          data-id={index}
          draggable="true"
          onDragStart={self.dragStart}
          onDragEnd={self.dragEnd}
          onClick={self.editField}
          className="list-group-item">
          
          {display} <div data-index={index} className="glyphicon glyphicon-remove pull-right" onClick={self.removeField}></div>
        </li>
      ) 
    }); 
    return fields;
  },
  render() {
    return (
      <ul className="list-group widget" onDragOver={this.dragOver}>
        {this.renderArray()}
      </ul>
    ) 
  } 
});
var placeholder = document.createElement("li");
placeholder.className = "placeholder";

Sortable = React.createClass({
  propTypes:{
    array: React.PropTypes.array,
    onChange: React.PropTypes.func
  },
  getInitialState(){
    return {
      array: this.props.array 
    } 
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
      var array = this.state.array;
      var from = Number(this.dragged.dataset.id);
      var to = Number(this.over.dataset.id);
      if(from < to) to--;
      if(this.nodePlacement == "after") to++;
      array.splice(to, 0, array.splice(from, 1)[0]);
      this.setState({array: array});
      this.props.onChange(this.state.array);
  },
  dragOver(e){
    e.preventDefault();
      this.dragged.style.display = "none";
      if(e.target.className == "placeholder") return;
      this.over = e.target;
      
      var relY = e.clientY - this.over.offsetTop;
    var height = this.over.offsetHeight / 2;
    var parent = e.target.parentNode;

    if(relY > height) {
        this.nodePlacement = "after";
        parent.insertBefore(placeholder, e.target.nextElementSibling);
    }
    else if(relY < height) {
        this.nodePlacement = "before"
        parent.insertBefore(placeholder, e.target);
    }
    console.log("relY", relY);
    console.log("height", height); 
  },
  renderArray(){
    var self = this;
    var items = this.state.array.map(function(item, index) {

      return (
        <li 
          key={index}
          data-id={index}
          draggable="true"
          onDragStart={self.dragStart}
          onDragEnd={self.dragEnd}
          className="list-group-item">
          
          {item}
        </li>
      ) 
    }); 
    return items;
  },
  render() {
    console.log("rendering sortable list", this.state.array);
    return (
      <ul className="list-group" onDragOver={this.dragOver}>
        {this.renderArray()}
      </ul>
    ) 
  } 
});
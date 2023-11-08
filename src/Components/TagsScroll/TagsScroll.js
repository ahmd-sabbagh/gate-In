import Tag from "../Tag/Tag";
import "./TagsScroll.css";


function TagsScroll(props) {
  return (
    <div className="TagsScroll position-relative overflow-hidden mt-3">
      <Tag Array={props.arr} type="card" />
    </div>
  );
}

export default TagsScroll;

function Section(props) {
  return (
    <div className="platform-section d-flex gap-4 flex-column flex-md-row align-items-center align-items-md-start">
      <div className="icon flex-c r-50">{props.icon}</div>
      <div className="text">
        <h4 className="fs-16-700 mb-2">{props.head}</h4>
        <p className="fs-16-400 text-color">{props.desc}</p>
      </div>
    </div>
  );
}

export default Section;

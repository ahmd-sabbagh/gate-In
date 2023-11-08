function Section(props) {
  return (
    <div className="PremiumServices-section d-flex flex-column gap-3 text-center">
      <div className="icon flex-c r-50">{props.icon}</div>
      <h4 className="fs-24-500">{props.head}</h4>
      <p className="fs-16-400 text-color">{props.desc}</p>
    </div>
  );
}

export default Section;

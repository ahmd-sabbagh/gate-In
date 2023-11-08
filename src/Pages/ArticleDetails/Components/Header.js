function Header({ date, tittle, brief }) {
  return (
    <div className="header mx-auto text-center d-flex flex-column gap-3">
      <div className="date fs-16-500 text-color">{date}</div>
      <h3 className="tittle fs-32-700">{tittle}</h3>
      <p className="brief fs-16-500 text-color">{brief}</p>
    </div>
  );
}

export default Header;

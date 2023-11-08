import "./QualifyingProgram.css";
import ProgramComponent from "./Components/ProgramComponent";
import ProgramOperation from "./Components/ProgramOperation";

function QualifyingProgram() {
  return (
    <div className="QualifyingProgram py-5">
      <div className="container">
        <ProgramComponent padding={false} />
        <ProgramOperation />
      </div>
    </div>
  );
}

export default QualifyingProgram;

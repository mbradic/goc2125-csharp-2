import { Link } from "react-router-dom";
import course from "./course.json";

function App() {
  const {code, name} = course
  return (
    <>
      <h1>[{code}] {name}</h1>
      <nav>
        <Link to="">Anotace</Link>
      </nav>
    </>
  );
}

export default App;

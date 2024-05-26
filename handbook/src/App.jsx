import { Link, Outlet } from "react-router-dom";
import course from "./course.json";

function App() {
  const { code, name } = course;
  return (
    <>
      <h1>
        [{code}] {name}
      </h1>
      <nav>
        <Link to="" className="active">Anotace</Link> {" | "}
        <Link to="required-knowledge">Požadované vstupní znalosti</Link> {" | "}
        <Link to="study-goals">Co vás naučíme</Link> {" | "}
        <Link to="toc">Osnova</Link>
      </nav>
      <Outlet />
    </>
  );
}

export default App;

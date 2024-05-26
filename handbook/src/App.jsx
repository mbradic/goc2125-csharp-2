import { Outlet } from "react-router-dom";
import course from "./course.json";
import { TopLink } from "./TopLink";

function App() {
  const { code, title } = course;

  return (
    <>
      <div style={{ display: "flex", alignItems: "baseline" }}>
        <h1>
          [{code}] {title}
        </h1>
        <nav style={{paddingLeft: "10px"}}>
          {" | "}
          <TopLink to="" label="Anotace" />
          {" | "}
          <TopLink to="studyGoals" label="Co vás naučíme" />
          {" | "}
          <TopLink to="requiredKnowledge" label="Požadované vstupní znalosti" />
          {" | "}
          <TopLink to="toc" label="Osnova" />
          {" | "}
          <TopLink to="lessons" label="Lekce" />
        </nav>
      </div>

      <hr />

      <Outlet />
    </>
  );
}

export default App;

import { Link, Outlet, useLocation } from "react-router-dom";
import course from "./course.json";
import { Fragment } from "react";

function TopLink({ to, label }) {
  const location = useLocation();
  return (
    <Link to={to} className={location.pathname === `/${to}` ? "active" : ""}>
      {label}
    </Link>
  );
}

function App() {
  const { code, title } = course;

  return (
    <>
      <h1>
        [{code}] {title}
      </h1>
      <nav>
        <TopLink to="" label="Anotace" />
        {" | "}
        <TopLink to="studyGoals" label="Co vás naučíme" />
        {" | "}
        <TopLink to="requiredKnowledge" label="Požadované vstupní znalosti" />
        {" | "}
        <TopLink to="toc" label="Osnova" />
      </nav>
      <nav>
        {course.lessons.map((lesson, lessonIndex, arr) => (
          <Fragment key={lessonIndex}>
            <TopLink to={"lessons/" + lesson.path} />
            {lessonIndex === arr.length - 1 && " | "}
          </Fragment>
        ))}
      </nav>
      <Outlet />
    </>
  );
}

export default App;

import course from "./course.json";

function App() {
  const {code, name} = course
  return (
    <>
      <h1>[{code}] {name}</h1>
    </>
  );
}

export default App;

import course from "./course.json";

function RequiredKnowledge() {
  return (
    <ul>
      {course.requiredKnowledge.map((sg, i) => (
        <li key={i}>{sg}</li>
      ))}
    </ul>
  );
}

export default RequiredKnowledge;

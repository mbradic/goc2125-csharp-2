import course from "./course.json";

function StudyGoals() {
  return (
    <ul>
      {course.studyGoals.map((sg, i) => (
        <li key={i}>{sg}</li>
      ))}
    </ul>
  );
}

export default StudyGoals;

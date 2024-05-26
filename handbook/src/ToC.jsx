import course from "./course.json";

function ToC() {
  return (
    <ul>
      {course.lessons.map((lesson, ndx) => (
        <li key={ndx}>
          <div>{lesson.title}</div>
          <ul>
            {lesson.topics.map((topic, topicNdx) => (
              <li key={topicNdx}>{topic}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

export default ToC;

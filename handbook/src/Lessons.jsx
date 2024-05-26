import course from "./course.json";
import { Fragment } from "react";
import { TopLink } from "./TopLink";
import { useParams } from "react-router-dom";

function Lessons() {
  const params = useParams();
  const lesson = course.lessons.find((l) =>
    params.lesson ? l.path === params.lesson : course.lessons[0]
  );

  const topic = params.topic ? lesson.topics.find(t=>t.path===params.topic) : lesson.topics[0]

  return (
    <>
      <nav>
        {course.lessons.map((lesson, lessonIndex, arr) => (
          <Fragment key={lessonIndex}>
            <TopLink to={`lessons/${lesson.path}`} label={lesson.shortTitle} />
            {lessonIndex === arr.length - 1 || " | "}
          </Fragment>
        ))}
      </nav>

      <hr />
      
      <h2>{lesson.title}</h2>
      
      <hr />
      
      <div style={{ display: "flex" }}>
        <nav style={{ borderRight: "1px solid white", padding: "15px" }}>
          {lesson.topics.map((topic, topicIndex) => (
            <div key={topicIndex}>
              <TopLink
                to={`lessons/${lesson.path}/${topic.path}`}
                label={topic.shortTitle}
              />
            </div>
          ))}
        </nav>

        <div style={{paddingLeft: "15px"}}>
          <h3>{ topic.title }</h3>
          <div dangerouslySetInnerHTML={{__html: topic.content}} />
        </div>
      </div>
    </>
  );
}
export default Lessons;

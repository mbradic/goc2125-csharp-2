import course from "./course.json";
import { Fragment, useEffect, useState } from "react";
import { TopLink } from "./TopLink";
import { useParams } from "react-router-dom";
import Markdown from "react-markdown";
import { CodeBlock, vs2015 } from "react-code-blocks";

function Lessons() {
  const codeFilesBaseUri =
    "https://api.github.com/repos/mbradic/goc2125-csharp-2/contents";
  const rawFilesBaseUri =
    "https://raw.githubusercontent.com/mbradic/goc2125-csharp-2/main";

  const [markdown, setMarkdown] = useState();
  const [codeFiles, setCodeFiles] = useState([]);

  const params = useParams();
  const lesson = course.lessons.find((l) =>
    params.lesson ? l.path === params.lesson : course.lessons[0]
  );

  const topic = params.topic
    ? lesson.topics.find((t) => t.path === params.topic)
    : lesson.topics[0];

  useEffect(() => {
    async function fetchText(cfs) {
      const result = [];
      for (let cf of cfs) {
        const response = await fetch(`${rawFilesBaseUri}/${cf.path}`);
        result.push({ ...cf, text: await response.text() });
      }
      return result;
    }

    async function getData() {
      const markdownResponse = await fetch(
        `https://raw.githubusercontent.com/mbradic/goc2125-csharp-2/main/handbook/public/lessons/${lesson.path}/${topic.path}.md`
      );
      setMarkdown(await markdownResponse.text());

      if (topic.showCode) {
        const codeFilesResponse = await fetch(
          `${codeFilesBaseUri}/code/MBradic.GOC2125/GeometryDemo?ref=main`
        );
        let cfs = await codeFilesResponse.json();
        cfs = await fetchText(cfs);
        setCodeFiles(cfs);
      }
    }
    getData();
  }, [lesson.path, topic.path, topic.showCode]);

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

        <div style={{ paddingLeft: "15px" }}>
          <h3>{topic.title}</h3>
          <div style={{ minWidth: "250px" }}>
            <Markdown>{markdown}</Markdown>
          </div>

          {topic.showCode && (
            <div>
              <h4>Příklad</h4>
              {codeFiles
                .filter(
                  (cf) => cf.name.endsWith(".cs") || cf.name === "output.txt"
                )
                .map((cf, i) => (
                  <div key={i}>
                    <a href={`${rawFilesBaseUri}/${cf.path}`}>{cf.name}</a>
                    <code>
                    <CodeBlock language="csharp" text={cf.text} theme={vs2015} />
                    </code>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default Lessons;

import course from "./course-rip.json" assert { type: "json" };
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { parse } from "node-html-parser";
import readlineSync from "readline-sync";

const parseList = (ulHtml) =>
  parse(ulHtml)
    .querySelectorAll("ul > li")
    .map((li) => li.innerHTML);

const parseToC = (tocHtml) => {
  const root = parse(tocHtml);
  const paragraphs = root.querySelectorAll("p");
  const lists = root.querySelectorAll("ul");
  const lessons = [];

  let lessonPaths;
  const lessonPathsFileName = "lesson-paths.json";
  if (existsSync(lessonPathsFileName))
    lessonPaths = JSON.parse(
      readFileSync(lessonPathsFileName, { encoding: "utf-8" })
    );

  let lessonShortTitles;
  const lessonShortTitlesFileName = "lesson-short-titles.json";
  if (existsSync(lessonShortTitlesFileName))
    lessonShortTitles = JSON.parse(
      readFileSync(lessonShortTitlesFileName, { encoding: "utf-8" })
    );

  for (let i = 0; i < paragraphs.length; i++) {
    const lesson = getLesson(i);
    addLessonPath(lesson);
    addLessonShortTitle(lesson);
    lessons.push(lesson);
  }
  return lessons;

  function addLessonPath(lesson) {
    if (!lessonPaths)
      lesson.path = readlineSync.question(`Path for lesson ${lesson.title}?> `);
    else lesson.path = lessonPaths.find((lp) => lp.title === lesson.title).path;
  }

  function addLessonShortTitle(lesson) {
    if (!lessonShortTitles)
      lesson.shortTitle = readlineSync.question(
        `Short title for lesson ${lesson.title}?> `
      );
    else
      lesson.shotrTitle = lessonShortTitles.find(
        (lst) => lst.title === lesson.title
      ).shortTitle;
  }

  function getLesson(i) {
    return {
      title: paragraphs[i].textContent,
      topics: lists[i].querySelectorAll("li").map((li) => li.innerHTML),
    };
  }
};

const relevantProps = [
  { title: "Co Vás naučíme", propName: "studyGoals", parse: parseList },
  {
    title: "Požadované vstupní znalosti",
    propName: "requiredKnowledge",
    parse: parseList,
  },
  { title: "Osnova kurzu", propName: "lessons", parse: parseToC },
];

for (let propety of course.properties) {
  const relevantProp = relevantProps.find((rp) => rp.title === propety.title);
  if (!relevantProp) continue;
  propety.propName = relevantProp.propName;
  course[relevantProp.propName] = relevantProp.parse(propety.html);
}

writeFileSync("course-level-1.json", JSON.stringify(course));

const lessonPaths = course.lessons.map((lesson) => ({
  title: lesson.title,
  path: lesson.path,
}));
writeFileSync("lesson-paths.json", JSON.stringify(lessonPaths));

const lessonShortTitles = course.lessons.map((lst) => ({
  title: lst.title,
  path: lst.shortTitle,
}));
writeFileSync("lesson-short-titles.json", JSON.stringify(lessonShortTitles));

//console.log(course);

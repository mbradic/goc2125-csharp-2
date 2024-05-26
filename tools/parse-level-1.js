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
  if (existsSync("lesson-paths.json"))
    lessonPaths = JSON.parse(
      readFileSync("lesson-paths.json", { encoding: "utf-8" })
    );
  for (let i = 0; i < paragraphs.length; i++) {
    const lesson = {
      title: paragraphs[i].textContent,
      topics: lists[i].querySelectorAll("li").map((li) => li.innerHTML),
    };
    if (!lessonPaths)
      lesson.path = readlineSync.question(`Path for lesson ${lesson.title}? >`);
    else lesson.path = lessonPaths.find((lp) => lp.title === lesson.title).path;

    lessons.push(lesson);
  }
  return lessons;
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

//console.log(course);

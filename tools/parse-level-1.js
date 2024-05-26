import course from "./course-rip.json" assert { type: "json" };
import { writeFileSync } from "node:fs";
import { parse } from "node-html-parser";

const parseList = (ulHtml) =>
  parse(ulHtml)
    .querySelectorAll("ul > li")
    .map((li) => li.innerHTML);

const parseToC = (tocHtml) => {
  const root = parse(tocHtml);
  const paragraphs = root.querySelectorAll("p");
  const lists = root.querySelectorAll("ul");
  const lessons = [];
  for (let i = 0; i < paragraphs.length; i++) {
    const lesson = {
      title: paragraphs[i].textContent,
      topics: lists[i].querySelectorAll("li").map((li) => li.innerHTML),
    };
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

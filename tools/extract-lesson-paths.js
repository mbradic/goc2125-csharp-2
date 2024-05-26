import course from "./course-level-1.json" assert { type: "json" };
import { writeFileSync } from "node:fs";

const lessonPaths = course.lessons.map((lesson) => ({
  title: lesson.title,
  path: lesson.path,
}));

writeFileSync("lesson-paths.json", JSON.stringify(lessonPaths));

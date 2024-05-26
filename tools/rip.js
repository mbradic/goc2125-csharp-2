import { parse } from "node-html-parser";
import { existsSync, readFileSync, writeFileSync } from "node:fs";

async function download(course) {
  const response = await fetch(course.gopasUrl);
  return await response.text();
}

/**
 *
 * @param {string} html
 */
function parseHtml(course, html) {
  const root = parse(html);
  course.code = root.querySelector(".product-code").textContent.trim();
  course.title = root.querySelector(".title").textContent.trim();
  const details = root.querySelector(".course-list-description");
  course.description = details
    .querySelectorAll(".description > p")
    .map((p) => p.innerHTML);
  course.properties = details
    .querySelectorAll(".collapsible-box")
    .map((cb) => ({
      title: cb.querySelector(".title").innerHTML,
      html: cb.querySelector(".body").innerHTML,
    }));
}

async function rip(course) {
  const courseHtmlFileName = "course.html";
  let html = "";

  if (!existsSync(courseHtmlFileName)) {
    html = download(course);
    writeFileSync(courseHtmlFileName, html);
  }

  if (!html) {
    html = readFileSync(courseHtmlFileName, { encoding: "utf-8" });
  }

  parseHtml(course, html);
  writeFileSync("course-rip.json", JSON.stringify(course));
}

const course = {
  gopasUrl: "https://www.gopas.cz/jazyk-c-sharp-programovani-ii_goc2125",
};
rip(course);
console.log(course);

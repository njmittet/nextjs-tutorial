import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import remark from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedBlogPosts() {
  const fileNames = fs.readdirSync(postsDirectory);
  const blogPosts = fileNames.map((fileName) => {
    // Remove '.md' from the filename in order to ude the filename without it as an id.
    const id = fileName.replace(/\.md$/, '');

    // Read the markdown file content.
    const fullPath = path.join(postsDirectory, fileName);
    const fileContent = fs.readFileSync(fullPath, 'utf-8');

    // Use gray-matter to parse the metadata section.
    const matterResult = matter(fileContent);
    return { id, ...matterResult.data };
  });

  return blogPosts.sort(({ date: a }, { date: b }) => {
    if (a === b) {
      return 0;
    }
    if (a > b) {
      return -1;
    }
    return 1;
  });
}

// The returned list must be an array of objects and each object must have the "params" key and contain an object
// with the key "id" (because [id] in the file name).
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map((fileName) => {
    return {
      params: { id: fileName.replace(/\.md$/, '') },
    };
  });
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContent = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section.
  const matterResult = matter(fileContent);

  // Use remark to convert markdown to HTML.
  const processedContent = await remark().use(html).process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the id, matter data and the parsed HTML.
  return { id, contentHtml, ...matterResult.data };
}

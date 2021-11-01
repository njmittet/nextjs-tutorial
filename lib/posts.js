import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

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

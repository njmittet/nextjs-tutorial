import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/posts';

// Pages that begin with [ and end with ] are dynamic routes in Next.js.
export default function Post({ postData }) {
  return (
    <Layout>
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
      <br />
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
  );
}

// Return a list of possible value for id.
export async function getStaticPaths() {
  const paths = getAllPostIds();
  return { paths, fallback: false };
}

// Fetches data for the blog post with a provided id.
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return { props: { postData } };
}

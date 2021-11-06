import Head from 'next/head';
import Layout from '../../components/layout';
import Date from '../../components/date';
import { getAllPostIds, getPostData } from '../../lib/posts';
import utilStyles from '../../styles/utils.module.css';

// Pages that begin with [ and end with ] are dynamic routes in Next.js, and can be extended to catch all paths by
// adding three dots (...) inside the brackets.
export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>

      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
      </article>
      <div className={utilStyles.lightText}>
        <Date dateString={postData.date} />
      </div>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </Layout>
  );
}

// Return a list of possible value for id. Must return an array as the value of the id key if the page is "catch-all":
// return [
//   {
//     params: {
//       // Statically Generates /posts/a/b/c
//       id: ['a', 'b', 'c']
//     }
//   }
// ]
export async function getStaticPaths() {
  const paths = getAllPostIds();
  return { paths, fallback: false };
}

// Fetches data for the blog post with a provided id. 'params.id' will be an array if the page is "catch-all":
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return { props: { postData } };
}

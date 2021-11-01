import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedBlogPosts } from '../lib/posts';

export default function Home({ blogPosts }) {
  console.log(blogPosts);
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Page introduction goes here.</p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {blogPosts.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              {title}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

// Static Generation: exporting an async function getStaticProps() from a page tells Next.js that the date should be
// fetched at build time.
export async function getStaticProps() {
  const blogPosts = getSortedBlogPosts();
  return { props: { blogPosts } };
}

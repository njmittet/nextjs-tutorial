import Head from 'next/head';
import Link from 'next/link';
import Alerts from '../components/alerts';
import UserList from '../components/userList';
import Date from '../components/date';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedBlogPosts } from '../lib/posts';

export default function Home({ blogPosts }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className={utilStyles.headingMd}>
        <p>Learning Next.js by implementing the Getting Started tutorial.</p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {blogPosts.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>

      <section className={utilStyles.padding1px}>
        <h2 className={utilStyles.headingLg}>Alerts</h2>
        <Alerts />
      </section>

      <section className={utilStyles.padding1px}>
        <h2 className={utilStyles.headingLg}>Users</h2>
        <UserList />
      </section>
    </Layout>
  );
}

// Static Generation: exporting an async function getStaticProps() from a page tells Next.js that the data should be
// fetched at build time. Since the result is computed at build time, request time parameters will not be
// available.
export async function getStaticProps() {
  const blogPosts = getSortedBlogPosts();
  return { props: { blogPosts } };
}

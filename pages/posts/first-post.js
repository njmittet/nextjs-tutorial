import Head from 'next/head';
import Layout from '../../components/layout';
import Alert from '../../components/alert';

export default function FirstPost({queryParams}) {
  console.log(queryParams)
  return (
    <>
      <Layout>
        <Head>
          <title>First Post</title>
        </Head>
        <h1>First Post</h1>
        <p>Testing Alert component</p>
        <Alert type={'success'}>Success</Alert>
        <Alert type={'error'}>Error</Alert>
      </Layout>
    </>
  );
}

// Export getServerSideProps instead of getStaticProps in order to use serer-side rendering. The server will compute the
// result on every request. Because getServerSideProps is called at request time, its parameter (context) contains
// request specific parameters.
export async function getServerSideProps(context) {
  return {
    props: {queryParams: context.query},
  };
}

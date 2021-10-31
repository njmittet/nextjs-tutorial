import Head from 'next/head';
import Layout from '../../components/layout';
import Alert from "../../components/Alert";

export default function FirstPost() {
  return (
    <>
      <Layout>
        <Head>
          <title>First Post</title>
        </Head>
        <h1>First Post</h1>
        <p>Testing Alert component</p>
          <Alert type={"success"}>Success</Alert>
          <Alert type={"error"}>Error</Alert>
      </Layout>
    </>
  );
}

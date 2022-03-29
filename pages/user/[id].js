import { useRouter } from 'next/router';
import useSwr from 'swr';
import Alert from '../../components/alert';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function User() {

  const router = useRouter();
  console.log(`Fetching user ${router.query.id}`)
  const { data, error } = useSwr(router.query.id ? `/api/user/${router.query.id}` : null, fetcher);
  if (error) {
    return <Alert type={'error'}>Failed to fetch user!</Alert>;
  }

  return !data ? <div /> : <div>{data.name}</div>;
}

import useSwr from 'swr';
import Link from 'next/link';

const fetcher = (url) => fetch(url).then((res) => res.json());

// A component wrapping demonstration of API routes.
export default function UserList() {
  const { data, error } = useSwr('/api/user', fetcher);

  if (error) {
    return <div>Failed to load users!</div>;
  }
  if (!data) {
    return <div>Loading users...</div>;
  }

  return (
    <ul>
      {data.map((user) => (
        <li key={user.id}>
          <Link href="/user/[id]" as={`/user/${user.id}`}>
            <a>{`User ${user.id}`}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
}

import useSwr from 'swr';
import Link from 'next/link';

const fetcher = (url) => fetch(url).then((res) => res.json());

// A component wrapping demonstration of API routes.
export default function UserList() {
  // This component is used when the initial page is rendered at compile time, i.e. backend, but also when the component is re-rendered (e.g. on-focus)
  // See https://stackoverflow.com/questions/70154417/how-to-prevent-component-re-render-on-switching-browser-tabs
  console.log("Fetching user list from component.")
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

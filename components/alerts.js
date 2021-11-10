// A component wrapping the Alerts components demonstrating usage of the classnames package.

import Alert from './alert';

export default function Alerts() {
  return (
    <>
      <Alert type={'success'}>Success</Alert>
      <Alert type={'error'}>Error</Alert>
    </>
  );
}

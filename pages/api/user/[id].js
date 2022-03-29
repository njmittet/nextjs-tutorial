export default function userHandler(req, res) {
  const {
    query: { id },
    method
  } = req;

  console.log(`Returning user ${id} from API route.`)

  switch (method) {

    case "GET":
      res.status(200).json({ id, name: `User ${id}` });
      break;
    default:
      res.setHeader("Allow", [ "GET" ]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

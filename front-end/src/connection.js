export default function fetch() {
  const HOST = process.env.REACT_APP_API_HOST;
  const PROTOCOL = process.env.REACT_APP_PROTOCOL;
  return (`${PROTOCOL}://${HOST}`);
}

export default function UserName(props) {
  return props.user
}

export function getServerSideProps({ params }) {
  const props = {
    user: params.username,
  }

  return {
    props,
  }
}

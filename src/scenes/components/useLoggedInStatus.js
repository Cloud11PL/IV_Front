import { useSelector } from 'react-redux';

export default function useLoggedInStatus() {
  const loggedIn = useSelector((state) => state.auth.isLoggedIn);

  return loggedIn;
}

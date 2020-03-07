import { useSelector } from 'react-redux';

export default function useBagTypes() {
  const bagTypes = useSelector((state) => state.bagTypes);
  return bagTypes;
}

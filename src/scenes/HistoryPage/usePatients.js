import { useSelector } from 'react-redux';

export default function usePatients() {
  const patients = useSelector((state) => state.patients);
  return patients;
}

import { useSelector } from 'react-redux';

export default function useDevices() {
  const devices = useSelector((state) => state.devices);

  return devices;
}

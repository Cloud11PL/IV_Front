import { useSelector } from 'react-redux';

export default function useDevices() {
  const devices = useSelector((state) => state.devices);
  return devices;
}

/*
import { useSelector } from 'react-redux';

export default function useSeries(deviceId) {
  const series = useSelector((state) => state.series[deviceId]);
  return series;
}

*/

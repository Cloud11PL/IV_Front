import { useSelector } from 'react-redux';

export default function useSeries(deviceId) {
  const series = useSelector((state) => state.series[deviceId]);
  return series;
}

import Grid from 'antd/lib/grid';
const { useBreakpoint } = Grid;

const useScreenBreakPoint = () => {
  const breakPoints = useBreakpoint();
  return { breakPoints };
};

export default useScreenBreakPoint;

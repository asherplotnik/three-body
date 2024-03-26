const getInitialPosition = (props: number): Position => {
  const randomNumberX = Math.random() * props;
  const randomNumberY = Math.random() * props;
  const randomNumberZ = Math.random() * props;
  return {mass: 10000000, x: randomNumberX, y: randomNumberY, z: randomNumberZ};
};

export const getRandomPosition = (props: number): Position => {
  const x = props < 2 ? props : -1
  const y = props < 2 ? props :  1.5
  const z = props < 2 ? props : 1;
  return {mass: 10000, x: x, y: y, z: z};
}

export default getInitialPosition;

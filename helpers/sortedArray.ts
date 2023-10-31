export default function sortedArray(a: any, b: any) {
  let [aX, aY] = a.split("_");
  let [bX, bY] = b.split("_");

  aX = parseInt(aX);
  aY = parseInt(aY);
  bX = parseInt(bX);
  bY = parseInt(bY);

  if (aX < bX) {
    return -1;
  } else if (aX > bX) {
    return 1;
  } else {
    if (aY < bY) {
      return -1;
    } else if (aY > bY) {
      return 1;
    } else {
      return 0;
    }
  }
}

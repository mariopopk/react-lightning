export default function throttle<A = unknown, R = void>(
  fn: (args: A) => R,
  timeout = 1000
) {
  let wait = false;

  return (args: A) => {
    if (wait) return;

    fn.call(null, args);
    wait = true;
    setTimeout(() => {
      wait = false;
    }, timeout);
  };
}

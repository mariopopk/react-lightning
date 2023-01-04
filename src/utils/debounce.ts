export default function debounce<A = unknown, R = void>(
  fn: (args: A) => R,
  timeout = 500
) {
  let timer: string | number | NodeJS.Timeout | undefined;
  return (args: A) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.call(null, args);
    }, timeout);
  };
}

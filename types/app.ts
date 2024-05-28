export default interface AppFunction<T = undefined> {
  boot: () => void;
  value: () => T;
}

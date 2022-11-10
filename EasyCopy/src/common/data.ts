import {Data} from "./api";

export function useDataKey<T>(key: string) {
  function load() {
    return Data.load(key) as T;
  }

  function save(value: T) {
    return Data.save(key, value);
  }

  function deleteData() {
    return Data.delete(key);
  }

  return [load, save, deleteData] as const;
}

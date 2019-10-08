export interface IStorage {
  get: (callback: (items: { [key: string]: any }) => void) => void;

  set: (items: {}, callback?: () => void) => void;
}

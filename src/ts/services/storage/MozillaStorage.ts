import { IStorage } from '@/services/storage/interfaces/IStorage';

export class MozillaStorage implements IStorage {
  private store = browser.storage.sync;

  public get(callback: (items: { [key: string]: any }) => void) {
    this.store.get().then(callback);
  }

  public set(items: {}, callback?: () => void) {
    this.store.set(items).then(callback);
  }
}

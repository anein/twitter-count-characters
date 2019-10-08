import { isMozilla } from '@/services/Browser';
import { IStorage } from '@/services/storage/interfaces/IStorage';
import { MozillaStorage } from '@/services/storage/MozillaStorage';

class Storage implements IStorage {
  private static _instance: Storage;

  private store: IStorage;

  private constructor() {
    this.store = isMozilla ? new MozillaStorage() : chrome.storage.sync;
  }

  static get instance() {
    if (!Storage._instance) {
      Storage._instance = new Storage();
    }

    return Storage._instance;
  }

  public get(callback: (items: { [p: string]: any }) => void) {
    this.store.get(callback);
  }

  public set(items: {}, callback?: () => void) {
    this.store.set(items, callback);
  }
}

export const Store = Storage.instance;

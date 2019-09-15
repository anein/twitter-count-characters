export abstract class Listener {
  public abstract draw(element: HTMLElement): void;

  public abstract onOptionsUpdate(): void;
}

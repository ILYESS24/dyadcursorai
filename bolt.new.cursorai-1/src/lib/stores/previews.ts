import { atom, map, type ReadableAtom, type MapStore } from 'nanostores';

export interface Preview {
  id: string;
  url: string;
  title: string;
}

export class PreviewsStore {
  #map: MapStore<Record<string, Preview>> = map({});
  previews: ReadableAtom<Preview[]> = atom(() => Object.values(this.#map.get()));
  activeId = atom<string | null>(null);

  constructor() {}

  addOrUpdate(preview: Preview) {
    this.#map.setKey(preview.id, preview);
    if (this.activeId.get() === null) {
      this.activeId.set(preview.id);
    }
  }

  remove(id: string) {
    const next = { ...this.#map.get() };
    delete next[id];
    this.#map.set(next);
    if (this.activeId.get() === id) {
      const first = Object.keys(next)[0] || null;
      this.activeId.set(first);
    }
  }
}

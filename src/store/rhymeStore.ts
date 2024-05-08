import { action, computed, makeAutoObservable, observable } from "mobx"
import uuid from "node-uuid"
import { RhymeItem, RhymeLine, RhymeToken } from '../model/rhymeLine';
import { calculateNewValue } from '@testing-library/user-event/dist/utils';
import rrr from "../mock/rhymes.json";

export class RhymeStore {
  rhymes: Rhyme[] = [];
  isLoading = true;
  selectedRhyme?: Rhyme;
  mode: number = 100;

  constructor() {
    makeAutoObservable(this, {
      isLoading: observable,
      selectedRhyme: observable,
      rhymes: observable,
      mode: observable,
      setSelectedRhyme: action,
      loadRhymes: action,
      setMode: action,
      appliedRhyme: computed,
    });
    this.loadRhymes()
  }

  get appliedRhyme(): Rhyme | undefined {
    return this.selectedRhyme?.applyMode(this.mode) ?? this.selectedRhyme;
  }

  setSelectedRhyme(selectedRhyme?: Rhyme) {
    this.selectedRhyme = selectedRhyme;
  }

  // Fetches all Rhymes
  loadRhymes() {
    this.isLoading = true;
    try {
      rrr.map(rr => this.addRhyme(rr.author, rr.title, rr.content));
      this.addRhyme("Сергей Есенин",
        "Белая береза",
        "Белая берёза\n" +
        "Под моим окном\n" +
        "Принакрылась снегом,\n" +
        "Точно серебром.\n" +
        "На пушистых ветках\n" +
        "Снежною каймой\n" +
        "Распустились кисти\n" +
        "Белой бахромой.\n" +
        "И стоит берёза\n" +
        "В сонной тишине,\n" +
        "И горят снежинки\n" +
        "В золотом огне.\n" +
        "А заря, лениво\n" +
        "Обходя кругом,\n" +
        "Обсыпает ветки\n" +
        "Новым серебром"
      );
    } finally {
      this.isLoading = false;
    }
  }

  addRhyme(author: string, title: string, content: string) {
    const rr = new Rhyme();
    rr.author = author;
    rr.title = title;
    rr.parse(content);
    this.rhymes.push(rr);
    return rr;
  }

  // A Rhyme was somehow deleted, clean it from the client memory.
  removeRhyme(rhyme: Rhyme) {
    this.rhymes.splice(this.rhymes.indexOf(rhyme), 1)
  }

  addMode(modeDelta: number) {
    if (!this.selectedRhyme) return;
    if (this.mode >= 100 && modeDelta > 0) return;
    if (this.mode <= 0 && modeDelta < 0) return;
    this.mode += modeDelta;
  }

  setMode(mode: number) {
    if (!this.selectedRhyme) return;
    this.mode = mode;
  }
}



// Domain object Rhyme.
export class Rhyme {
  id: string; // Unique id of this Rhyme, immutable.
  author: string = "";
  title: string = "";
  content: RhymeItem;

  constructor(id = uuid.v4()) {
    makeAutoObservable(this, {
      id: false,
    })
    this.id = id;
    this.content = {lines: []};
  }

  parse(content: string): void {
    const lines = content.split("\n");
    let ii = 0;
    lines.forEach((v) => {
      let iX = 0;
      let rL: RhymeLine = new RhymeLine();
      rL.positionY = ++ii;
      rL.tokens = v.split(" ").map((s) => {
          const token: RhymeToken = {
            content: s,
            positionX: iX,
            visible: true,
          };
          iX += s.length; // TODO: для моноширинного шрифта только
          return token;
        });
      this.content.lines.push(rL);
    });
  }

  get asJson(): Rhyme {
    let rr = new Rhyme();
    rr.author = this.author;
    rr.title = this.title;
    rr.content = this.content;
    return rr;
  }

  applyMode(mode: number): Rhyme {
    const res = new Rhyme();
    res.id = this.id;
    res.content = this.content;
    res.author = this.author;
    res.title = this.title;
    res.content = {
        ...this.content,
        lines: this.content.lines.map(line => {
          const line2 = new RhymeLine();
          line2.tokens = line.tokens;
          line2.setMode(mode)
          return line2;
        }),
    };
    return res;
  }
}

export const rhymeStore = new RhymeStore();
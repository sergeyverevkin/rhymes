import { action, makeAutoObservable, observable } from "mobx"
import rrr from "../mock/rhymes.json";
import { Rhyme } from '../model/rhyme';

export class RhymeStore {
  rhymes: Rhyme[] = [];
  isLoading = true;
  selectedRhyme?: Rhyme;
  showPercent: number = 100;
  toggledWordX: number = 0;
  toggledWordY: number = 0;

  constructor() {
    makeAutoObservable(this, {
      isLoading: observable,
      selectedRhyme: observable,
      rhymes: observable,
      showPercent: observable,
      setToggledWord: action,
      setSelectedRhyme: action,
      addMode: action,
      loadRhymes: action,
    });
    this.loadRhymes()
  }

//  get appliedRhyme(): Rhyme | undefined {
//    return this.selectedRhyme;
    /*
    if (this.isRecalc) {
      this.disableRecalc();
      return this.selectedRhyme?.applyMode(
        this.showPercent,
        this.toggledWordX,
        this.toggledWordY) ?? this.selectedRhyme;
    }
    return this.selectedRhyme;
    */
//}

  setToggledWord(x: number, y: number): void {
    if (this.toggledWordX === x && this.toggledWordY === y) {
      this.toggledWordX = -1;
      this.toggledWordY = -1;
      return;
    }
    this.toggledWordX = x;
    this.toggledWordY = y;
    this.selectedRhyme?.applyModeSelf(this.showPercent, this.toggledWordX, this.toggledWordY);
  }

  setSelectedRhyme(guid: string) {
    if (this.selectedRhyme && this.selectedRhyme.id === guid) {
      return;
    }
    const selectedRhyme = this.rhymes.find(r => r.id === guid);
    if (selectedRhyme) {
      this.selectedRhyme = new Rhyme(selectedRhyme);
      this.selectedRhyme.applyModeSelf(this.showPercent, this.toggledWordX, this.toggledWordY);
    }
  }

  addMode(modeDelta: number) {
    if (!this.selectedRhyme) return;
    if (this.showPercent >= 100 && modeDelta > 0) return;
    if (this.showPercent <= 0 && modeDelta < 0) return;
    this.showPercent += modeDelta;
    this.selectedRhyme.applyModeSelf(this.showPercent,  this.toggledWordX, this.toggledWordY);
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
}



export const rhymeStore = new RhymeStore();
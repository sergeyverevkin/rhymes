import { action, makeAutoObservable, observable } from "mobx"
import rrr from "../mock/rhymes.json";
import { Rhyme } from '../model/rhyme';
import { DefaultApi } from '../service/default-api';
import { IRhyme } from '../service/models';

export class RhymeStore {
  rhymes: Rhyme[] = [];
  isLoading = true;
  selectedRhyme?: Rhyme;
  showPercent: number = 100;
  toggledWordX: number = 0;
  toggledWordY: number = 0;
  service: DefaultApi = new DefaultApi({
    basePath: process.env.REACT_APP_API
  }, process.env.REACT_APP_API);

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
      startLoading: action,
      finishLoading: action,
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

  startLoading() {
    this.isLoading = true;
  }

  finishLoading() {
    this.isLoading = false;
  }

  // Fetches all Rhymes
  loadRhymes() {
    this.startLoading();
//      rrr.map(rr => this.addRhyme(rr.author, rr.title, rr.content));
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
    this.addRhyme("Николай Некрасов", "Мороз, красный нос", 
      "Есть женщины в русских селеньях\n" +
      "С спокойною важностью лиц,\n" +
      "С красивою силой в движеньях,\n" +
      "С походкой, со взглядом цариц,\n" +
      "Их разве слепой не заметит,\n" +
      "А зрячий о них говорит:\n" +
      "«Пройдет — словно солнце осветит!\n" +
      "Посмотрит — рублем подарит!»\n" +
      "Идут они той же дорогой,\n" +
      "Какой весь народ наш идет,\n" +
      "Но грязь обстановки убогой\n" +
      "К ним словно не липнет.\n" +
      "Цветет Красавица, миру на диво,\n" +
      "Румяна, стройна, высока,\n" +
      "Во всякой одежде красива,\n" +
      "Ко всякой работе ловка.\n" +
      "И голод и холод выносит,\n" +
      "Всегда терпелива, ровна…\n" +
      "Я видывал, как она косит:\n" +
      "Что взмах — то готова копна!\n" +
      "Платок у ней на ухо сбился,\n" +
      "Того гляди косы падут.\n" +
      "Какой-то парнек изловчился\n" +
      "И кверху подбросил их, шут!\n" +
      "Тяжелые русые косы\n" +
      "Упали на смуглую грудь,\n" +
      "Покрыли ей ноженьки босы,\n" +
      "Мешают крестьянке взглянуть.\n" +
      "Она отвела их руками,\n" +
      "На парня сердито глядит.\n" +
      "Лицо величаво, как в раме,\n" +
      "Смущеньем и гневом горит…\n" +
      "По будням не любит безделья.\n" +
      "Зато вам ее не узнать,\n" +
      "Как сгонит улыбка веселья\n" +
      "С лица трудовую печать.\n" +
      "Такого сердечного смеха,\n" +
      "И песни, и пляски такой\n" +
      "За деньги не купишь. «Утеха!»\n" +
      "Твердят мужики меж собой."
    );
    /*
      const pp = this.service.getRhymeRhymesActual().then(
        rr2 => {
          const rr3: IRhyme[] = rr2.data as IRhyme[];
          rr3.forEach((r) => this.addRhyme(r.author ?? "-", r.title ?? "-", r.content ?? "-"));
        }
      );
      pp.then(() => this.finishLoading());
    */
      this.finishLoading();
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
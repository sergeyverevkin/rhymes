import React from 'react';
import './App.css';
import { rhymeStore } from '../store/rhymeStore';
import { RhymeList } from '../components/RhymeList';
import { observer } from "mobx-react-lite";
import { RhymeComponent } from '../components/RhymeComponent';

const App = observer(
  () => {
    const selected: string = rhymeStore.selectedRhyme ? rhymeStore.selectedRhyme.id : "";
    const mainBlock = rhymeStore.isLoading
      ? <div>Loading...</div>
      : (rhymeStore.selectedRhyme
        ? <RhymeComponent rhyme={rhymeStore.selectedRhyme} xx={rhymeStore.toggledWordX} yy={rhymeStore.toggledWordY}/>
        : <RhymeList rhymes={rhymeStore.rhymes} selected={selected}/>);
    return (
      <div className="App">
        <header className="App-header" onClick={() => rhymeStore.setSelectedRhyme("")}>Стихи</header>
        <main className="App-main">
          {mainBlock}
        </main>
      </div>);
/*    return (
      <div className="App">
        <header className="App-header" onClick={() => rhymeStore.setSelectedRhyme("")}>Стихи</header>
        <main className="App-main">
          {mainBlock}
        </main>
        <footer>
          Стихотворений в базе: {rhymeStore.rhymes.length} шт
        </footer>
      </div>);
      */
  }
);
/*
export class App extends React.Component<{ }> {
  render() {
    const rhymeStore: RhymeStore = new RhymeStore();
    const selected: string = rhymeStore.selectedRhyme ? rhymeStore.selectedRhyme.id : "";
    console.log(rhymeStore.selectedRhyme ? "1" : "0");
    const mainBlock = rhymeStore.isLoading
      ? "<div>Loading...</div>"
      : (rhymeStore.selectedRhyme
        ? <RhymeComponent rhyme={rhymeStore.selectedRhyme}/>
        : <RhymeList rhymes={rhymeStore.rhymes} selected={selected}/>);
    return (
      <div className="App">
        <header className="App-header">Стихи</header>
        <main className="App-main">
          {mainBlock}
        </main>
        <footer>
          Стихотворений в базе: {rhymeStore.rhymes.length} шт
        </footer>
      </div>);
  };
};
*/
export default App;
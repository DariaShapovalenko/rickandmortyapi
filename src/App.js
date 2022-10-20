import './App.css';
import Card from './components/character/character';
import Search from './components/search/search';
import Details from './components/details/details';
import {useEffect, useState} from 'react';
import './components/search/search.css';
import './components/character/character.css';
import './components/details/details.css'
function App() {
  const [characters, setcharacters] = useState([]);
  const [value, setvalue] = useState("");
  const [favoritecharacters, setfavoritecharacters] = useState([]);
  const [details, showdetails] = useState(false);
  function debounce(f, timeout){
    let timer;
    return function(){
      const fnCall = () => {f.apply(this, arguments)};
      clearTimeout(timer);
      timer = setTimeout(fnCall, timeout);
    }
  }
  useEffect(()=>{
  fetch("https://rickandmortyapi.com/api/character")
    .then(res => res.json())
    .then(result => {setcharacters(result.results)}
      )}, []);
  
  function searchcharacter(value){
    fetch(`https://rickandmortyapi.com/api/character/?name=${value}`)
    .catch(setcharacters([]))
    .then(res => res.json())
    .then(result => {setcharacters(result.results.filter(obj =>{return obj.id <= 100}))})
    console.log(value);
  }
  searchcharacter = debounce(searchcharacter, 600);
  
  function choosepage(page){
    showdetails(false);
    fetch(`https://rickandmortyapi.com/api/character${page}`)
    .then(res => res.json())
    .then(result => {setcharacters(result.results)})
  }
  function outputfavorites() {
    showdetails(false);
    if (favoritecharacters.length > 1)
    {
    fetch(`https://rickandmortyapi.com/api/character/${favoritecharacters}`)
    .then(res => res.json())
    .then(result => {setcharacters(result)})
    }
    else if(favoritecharacters.length === 1)
    {
      fetch(`https://rickandmortyapi.com/api/character/${favoritecharacters[0]}`)
      .then(res => res.json())
      .then(result => {setcharacters([result])})
    }
    else if(favoritecharacters.length === 0)
    {
      setcharacters([]);
    }
  }
  function seeinfo(id){
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
    .then(res => res.json())
    .then(result => {setcharacters([result])})
  }

  return (
    <div className="App">
      <Search value = {value} setvalue = {setvalue} searchcharacter ={searchcharacter}></Search>
      <div>
      <ul className='Menu'>
        <li onClick={() => choosepage(``)} className="paragraph"><span>Main</span></li>
        <li onClick={outputfavorites} className="paragraph"><span>Favorites</span></li>
      </ul>
      {details? ``:<div className='box'>
        <button  className = {`page`} onClick={() => choosepage(``)}>1</button>
        <button  className = {`page`} onClick={() => choosepage(`/?page=2`)}>2</button>
        <button  className = {`page`} onClick={() => choosepage(`/?page=3`)}>3</button>
        <button  className = {`page`} onClick={() => choosepage(`/?page=4`)}>4</button>
        <button  className = {`page`} onClick={() => choosepage(`/?page=5`)}>5</button>
      </div>}
      </div>
      <div className='characters-wrapper'>
      <ul>
        {details ? <Details obj ={characters}></Details> : characters.map((obj) => 
        <Card obj = {obj} favorites = {favoritecharacters} setfavorites = {setfavoritecharacters}
        seeinfo ={seeinfo} showdetails ={showdetails} details = {details}></Card>)}
      </ul>
      </div>
    </div>
  );
}

export default App;

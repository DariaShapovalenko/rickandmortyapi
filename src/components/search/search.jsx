import Lupa from './magnifying-glass-solid.svg'
function Search(props){
    return(
    <div className="search-wrapper">
        <div className="search-border">
            <input placeholder="Search..." 
            className="input" onChange={(event) => props.searchcharacter(event.target.value)}></input>
            <img src={Lupa} alt="search" className='button'/>
        </div>
    </div>
    )
}
export default Search;
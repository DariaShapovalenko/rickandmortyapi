function Card(props){
    function addfavorite(id){
        {props.favorites.includes(id)? props.setfavorites(props.favorites.filter(obj => {return obj != id})) : props.setfavorites([...props.favorites, id]) };
    }
    function choosencharacter(id){
        props.showdetails(!props.details);
        props.seeinfo(id);
    }
    return(
<li id={props.obj.id}>
    <div className="card">
        <div className="image-wrapper">
        <img src={props.obj.image} alt="lol" className="character-image"></img>
        </div>
        <button onClick = {() => addfavorite(props.obj.id)} className = {`star ${props.favorites.includes(props.obj.id) && 'changed'}`} ></button>
        <div className="info">
            <span className="name" onClick={() => choosencharacter(props.obj.id)}>Name: {props.obj.name}</span>
            <div>Gender: {props.obj.gender}</div>
            <div>Species: {props.obj.species}</div>
        </div>
    </div>
</li>)
}
export default Card;
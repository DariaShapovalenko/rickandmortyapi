function Details(props){
    return(<div>
        <img src={props.obj[0].image} alt="lol" className="characters-image"></img>
        <div className="characters-info">
        <div>Name : {props.obj[0].name}</div>
        <div>Status : {props.obj[0].status}</div>
        <div>Species : {props.obj[0].species}</div>
        <div>Origin : {props.obj[0].origin.name}</div>
        </div>
        </div>
    )
}
export default Details;
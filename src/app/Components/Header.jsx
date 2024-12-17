"use client"

const Header = (props) => {
    return(
        <div className="header">
        <h1>{props.my_name}</h1>
        <h2>{props.project_name}</h2> 
        </div>
    )
}

export default Header;

const Footer = (props) => {
    return(
      <div className="footer">
      <p> {props.project_name} - © Desenvolvido por {props.my_name}</p>
      </div>  
    )
}

export default Footer;
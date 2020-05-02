import React, { Component } from 'react';
import NavBar from './NavBar'

class Home extends Component{

    render(){
        let name="";
        if(this.props.location.state){
         name=this.props.location.state.name;
        }

return(<h1>
            {name && <NavBar name={name}/> }
{!name && <NavBar/> }
    </h1>)
    }

}
export default Home;
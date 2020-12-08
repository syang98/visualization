import axios from 'axios';
import { React, Component } from 'react';

export default class Authorize extends Component {
    constructor(){
        super();
        this.login = this.login.bind(this);
    }

    render() {
        return (
            <div>
                <button type='button' onClick={this.login} >Authorize Spotify</button>
                {/* <form onSubmit={e => { e.preventDefault(); }} onClick={this.login}>
                    <input type='submit' value='Authorize Spotify'/>
                </form> */}
            </div>
        )
    }

    login() {

        axios.get("/api/login")
            .then(res => {
                console.log("HERE");
                window.location.href = res.data.url;
            })
    }
}

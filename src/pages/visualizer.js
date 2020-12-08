import {React, Component} from 'react';
import queryString from 'query-string';
import axios from 'axios';

export default class Visualizer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token:null,
            refresh: null,
            timeout: null
        };
    }
    render() {
        return (
            <div>
                {this.state.token}
            </div>
        )
    }
    componentDidMount() {
        const params = queryString.parse(window.location.search);
        const code = params.code;
        const state = params.state;
        axios.get(`/api/callback/${code}/${state}`)
            .then(res => {
                this.setState({
                    token: res.data.token,
                    refresh: res.data.refresh,
                    timeout: res.data.timeout
                });
            })
            .catch(e => console.log(e));
    }
}
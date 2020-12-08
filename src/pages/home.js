import { React, Component } from 'react';
import axios from 'axios';
import Authorize from '../components/authorize';

export default class Home extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <div>
                <Authorize/>
            </div>
        )
    }
}
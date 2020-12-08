import { React, Component} from 'react';
import Home from './pages/home';
import Visualizer from './pages/visualizer';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


export default class App extends Component{
  render() {
    return (
      <main>
        <BrowserRouter>
          <Switch>
            <Route path='/' component={Home} exact/>
            <Route path='/visualizer' component={Visualizer} />
          </Switch>
        </BrowserRouter>
      </main>
    );
  }
  
}










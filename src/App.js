
import './App.css';
import LoadingBar from 'react-top-loading-bar'
import {
 HashRouter as Router,
  Routes,
  Route
} from "react-router-dom";




import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';

export default class App extends Component {
  pageSize=9;

state={
  progress:0
}
setProgress=(progress)=>{

  this.setState({progress:progress});
}

  render() {
    return (
      <div>
        <Router>
          

          <Navbar  />

          <LoadingBar
          height={5}
        color='#f11946'
        progress={this.state.progress}
        
      />

          <Routes>
           
            <Route exact path="/home" element={<News setProgress= {this.setProgress} key="home" pageSize={this.pageSize} country="in" category="general" />} />
            <Route exact path="/business" element={<News setProgress= {this.setProgress} key=" business" pageSize={this.pageSize} country="in" category="business" />} />
            <Route exact path="/entertainment" element={<News setProgress= {this.setProgress} key="entertain" pageSize={this.pageSize} country="in" category="entertainment" />} />
            <Route exact path="/health" element={<News setProgress= {this.setProgress} key="health" pageSize={this.pageSize} country="in" category="health" />} />
            <Route exact path="/science" element={<News setProgress= {this.setProgress} key="science" pageSize={this.pageSize} country="in" category="science" />} />
            <Route exact path="/sports" element={<News setProgress= {this.setProgress} key="sports" pageSize={this.pageSize} country="in" category="sports" />} />
            <Route exact path="/tech" element={<News setProgress= {this.setProgress} key="tech" pageSize={this.pageSize} country="in" category="technology" />} />



          </Routes>
        </Router>
      </div>
    )
  }
}
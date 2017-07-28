import React, { Component, PropTypes } from 'react'
import Header from '../components/Header'
import Nav from '../components/nav/NavAssembler'
import PageHeader from '../components/archive/PageHeader';
import PageFooter from '../components/archive/PageFooter';
import {setBodyClass,setMainClass} from '../utils/body'

class App extends Component {

  componentDidMount() {
      setBodyClass('index-bg');
      setMainClass('main');
  }

  render() {
    const { children } = this.props;
    return (
      <div>
        <PageHeader/>
        <Header/>
        <div className="main-body">
          <Nav/>
          {children}
          <div className="cls"></div>
        </div>
        <div className="yun1 yun"> </div>
        <div className="yun2 yun"> </div>
        <div className="yun3 yun"> </div>
        <div className="yun4 yun"> </div>
         <PageFooter/>
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.node
};

export default App

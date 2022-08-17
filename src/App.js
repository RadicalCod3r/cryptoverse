import logo from './logo.svg';
import './App.css';

import { Navbar, Homepage, Exchanges, News, CryptoDetails, Cryptocurrencies } from './components';
import { Routes, Route, Link } from 'react-router-dom';
import { Space, Typography } from 'antd';

function App() {
  return (
    <div className="app">
      <div className='navbar'>
        <Navbar />
      </div>
      <div className='main'>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/exchanges' element={<Exchanges />} /> 
          <Route path='/cryptocurrencies' element={<Cryptocurrencies />} /> 
          <Route path='/crypto/:coinId' element={<CryptoDetails />} /> 
          <Route path='/news' element={<News />} /> 
        </Routes>
        <div className='footer'>
          <Typography.Title level={5} style={{color: '#fff', textAlign: 'center'}}>
            Cryptoverse <br />
            All rights reserved
          </Typography.Title>
          <Space>
            <Link to='/'>Home</Link>
            <Link to='/exchanges'>Exchanges</Link>
            <Link to='/news'>News</Link>
          </Space>
        </div>
      </div>
    </div>
  );
}

export default App;

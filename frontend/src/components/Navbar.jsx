import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ padding: '10px', backgroundColor: '#f8f9fa', borderBottom: '1px solid #ddd' }}>
      <ul style={{ display: 'flex', gap: '20px', listStyle: 'none', margin: 0, padding: 0 }}>
        <li>
          <Link to="/" style={{ textDecoration: 'none', color: '#007bff' }}>
            ホーム
          </Link>
        </li>
        <li>
          <Link to="/chat" style={{ textDecoration: 'none', color: '#007bff' }}>
            チャットボット
          </Link>
        </li>
        <li>
          <Link to="/saved" style={{ textDecoration: 'none', color: '#007bff' }}>
            保存済みレシピ
          </Link>
        </li>
        <li>
          <Link to="/about" style={{ textDecoration: 'none', color: '#007bff' }}>
            このアプリについて
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

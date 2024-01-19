import React from 'react';
import "./Header.css";

const Header = () => {
    return (
        <div className='header'>
            <div className='HomePage'>
                <h5>HomePage</h5>
            </div>
            <div className='leftdiv'>
                <a className='Btn1' href='Header.jsx'>LogIn</a>
                <button className='Btn2' href="Header.jsx">Create Account</button>
            </div>
        </div>
    )
}

export default Header;

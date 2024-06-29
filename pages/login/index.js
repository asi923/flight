import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiUserPlus } from 'react-icons/fi';

import './styles.css';

import api from '../../services/api';

import logo from '../../assets/big-logo.svg';
import plane from '../../assets/big-plane.svg'

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try{
            const response = await api.post('sessions', { email, password });

            localStorage.setItem('airlineEmail', email);
            localStorage.setItem('airlinePassword', password);
            localStorage.setItem('airlineName', response.data.name);

            history.push('/profile');
        } catch(err) {
            alert('Login failed, please try again.');
        }
    }

    return (
        <div className="login-container">
            <section className="form">
                <img src={logo} alt="FGAirlines" />
                
                <form onSubmit={handleLogin}>
                    <h1>Faça seu login</h1>

                    <input placeholder="your email" 
                        value={email}
                        onChange={e=>setEmail(e.target.value)}
                        style={{marginBottom: "10px"}}
                    />
                    <input placeholder="your password" 
                        type="password"
                        value={password}
                        onChange={e=>setPassword(e.target.value)}
                        style={{marginBottom: "5px"}}
                    />
                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiUserPlus size={16} color="#17333C" />
                        Don’t have an account? Register now
                    </Link>
                </form>
            </section>

            <img className="big-plane" src={plane} alt="Airplane" />
        </div>
    );
}
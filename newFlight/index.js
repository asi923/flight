import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logo from '../../assets/logo.svg'

export default function NewFlight() {
    const [destiny, setDestiny] = useState('');
    const [data, setData] = useState('');
    const [hour, setHour] = useState('');
    const [value, setValue] = useState('');

    const history = useHistory();

    const airlineId = localStorage.getItem('airlineId');

    async function handleNewFlight(e) {
        e.preventDefault();

        const dataFlight = {
            destiny,
            data,
            hour,
            value,
        };

        try {
            await api.post('flights', dataFlight, {
                headers: {
                    Authorization: airlineId,
                }
            })

            history.push('/profile');
        } catch(err) {
            alert('Error creating a new flight, please');
        }
    }

    return (
        <div className="new-flight-container">
            <div className="content">
                <section>
                    <img src={logo} alt="FGAirlines" />

                    <h1>Register new flight</h1>
                    <p>Register a new flight and put it up for sale right now!</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#17333C" />
                        Voltar
                    </Link>
                </section>

                <form onSubmit={handleNewFlight}>
                    <input 
                        placeholder="destiny" 
                        value={destiny}
                        onChange={e => setDestiny(e.target.value)}
                    />
                    <div className="form-group">
                        <input 
                            placeholder="Data" 
                            value={data}
                            onChange={e => setData(e.target.value)}
                        />
                        <input 
                            placeholder="hour" 
                            value={hour}
                            onChange={e => setHour(e.target.value)}
                        />
                    </div>
                    <input 
                        placeholder="value " 
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                    <button className="button" type="submit">register</button>
                    
                        
                </form>
            </div>
        </div>
    );
}
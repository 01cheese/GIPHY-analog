import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import NavBar from './components/NavBar';

import Main from './scenes/Main';
import SaveGifs from './scenes/save_gifs';

class App extends Component {
    state = {
        user: null,
    };

    componentDidMount() {
        const urlParams = new URLSearchParams(window.location.search);
        const tokenFromURL = urlParams.get('token');

        if (tokenFromURL) {
            localStorage.setItem('token', tokenFromURL);
            window.history.replaceState(null, null, window.location.pathname);
        }

        const token = localStorage.getItem('token');
        if (token) {
            axios
                .get(`${process.env.REACT_APP_API_BASEURL}auth/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                })
                .then(res => this.setState({ user: res.data }))
                .catch(() => {
                    localStorage.removeItem('token');
                    this.setState({ user: null });
                });
        }
    }

    signInWithGoogle = () => {
        window.location.href = `${process.env.REACT_APP_API_BASEURL}auth/google`;
    };

    signIn = async (email, password) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_BASEURL}auth/login`, {
                email,
                password,
            });
            localStorage.setItem('token', res.data.token);
            this.setState({ user: res.data.user });
        } catch (error) {
            alert('Login failed');
        }
    };

    signOut = () => {
        localStorage.removeItem('token');
        this.setState({ user: null });
    };

    render() {
        const { user } = this.state;

        return (
            <Router>
                <NavBar
                    user={user}
                    signIn={this.signIn}
                    signOut={this.signOut}
                    signInWithGoogle={this.signInWithGoogle}
                />

                <Routes>
                    <Route path="/" element={<Main user={user} />} />
                    <Route
                        path="/save_gifs"
                        element={user ? <SaveGifs user={user} /> : <Navigate to="/" />}
                    />
                </Routes>
            </Router>
        );
    }
}

export default App;

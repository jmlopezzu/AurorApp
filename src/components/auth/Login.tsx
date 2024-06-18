import { useState, useEffect } from 'react'
import { Modal, Button } from '@mui/material'
import './Login.css'
import { loginService } from '../../services/login';

export default function Login() {
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleLogin = async () => {
        try {
            const response = await loginService({ usernameOrEmail, password });
            // Handle successful login (e.g., navigate to a different page)
            console.log('Login successful:', response.data);
        } catch (error) {
            // Handle login errors (e.g., display an error message)
            console.error('Login error:', error);
        }
    };
    
    useEffect(() => {
        console.log('email:', usernameOrEmail);
        console.log('password:', password);
    }, [usernameOrEmail, password]);

    // const handleLogin2 = () => {
    //     loginService({ email, password })
    //         .then((response) => {
    //             // Handle successful login (e.g., navigate to a different page)
    //             console.log('Login successful:', response.data);
    //         })
    //         .catch((error) => {
    //             // Handle login errors (e.g., display an error message)
    //             console.error('Login error:', error);
    //         });
    // };

    return (
        <>
            <div className='login'>
                <Button onClick={handleOpen} style={{color: 'white'}}>Ingresar</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div className='modal-content'>
                        <img className='logo-paloma' src='paloma.png'></img>
                        <form onSubmit={(event) => {handleLogin(); event.preventDefault();}}>
                            <div>
                                {/* <label>email:</label> */}
                                <input type="text" value={usernameOrEmail} placeholder='email' onChange={(e) => setUsernameOrEmail(e.target.value)} />
                            </div>
                            <div>
                                {/* <label>Password:</label> */}
                                <input type="password" value={password} placeholder='password' onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <button type="submit">Iniciar sesion</button>
                        </form>
                    </div>
                </Modal>
            </div>
        </>

    );
}


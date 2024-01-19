import React from "react";

export default function Login({onLogin}) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleSubmit(e) {
        e.preventDefault();
      
        onLogin(email, password);
      }

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    return (
        <>
            <div className="login">
            <h2 className="login__header">Вход</h2>
                <form className="login__form" onSubmit={handleSubmit}>
                    <input name="email" type="text" placeholder="Email" className="login__input" id="email-input" required minLength="8" maxLength="40" value={email} onChange={handleEmailChange}></input>
                    <input name="password" type="password" placeholder="Пароль" className="login__input" id="password-input" required minLength="8" maxLength="40" value={password} onChange={handlePasswordChange}></input>
                    <button type="submit" className="login__submit-btn">Войти</button>
                </form>
            </div>
        </>
    )
}
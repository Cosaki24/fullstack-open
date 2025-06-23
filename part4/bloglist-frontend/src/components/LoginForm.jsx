const LoginForm = ({ handleLogin, loginError }) => (
    <div>
        <h2>Login</h2>
        <form action={handleLogin}>
            <div>
                <label htmlFor="username">Username:</label>
                <input id="username" type="text" name="username" required />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input id="password" type="password" name="password" />
            </div>
            <button type="submit">Login</button>
        </form>
        {loginError ? <p style={{ color: "red" }}>{loginError}</p> : null}
    </div>
)

export default LoginForm
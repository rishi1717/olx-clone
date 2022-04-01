import React, { useState, useContext } from "react"
import { FirebaseContext } from "../../store/Context"
import Logo from "../../olx-logo.png"
import "./Login.css"
import { useHistory } from "react-router-dom"

function Login() {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [err,setErr] = useState("")
	const { firebase } = useContext(FirebaseContext)
	const history = useHistory()
	const loginHandler = (e) => {
		e.preventDefault()
		setErr("")
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then(() => {
				history.push("/")
			})
			.catch((err) => {
				setErr(err.message)
			})
	}
	return (
		<div>
			<div>
				<p className="errorDiv">{err}</p>
			</div>
			<div className="loginParentDiv">
				<img width="200px" height="200px" alt="OLX" src={Logo}></img>
				<form onSubmit={loginHandler}>
					<label htmlFor="fname">Email</label>
					<br />
					<input
						className="input"
						type="email"
						id="fname"
						name="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<br />
					<label htmlFor="password">Password</label>
					<br />
					<input
						className="input"
						type="password"
						id="password"
						name="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<br />
					<br />
					<button>Login</button>
				</form>
				<a
					onClick={() => {
						history.push("/signup")
					}}
				>
					Signup
				</a>
			</div>
		</div>
	)
}

export default Login

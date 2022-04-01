import React, { useState, useContext } from "react"
import { useHistory } from "react-router-dom"
import Logo from "../../olx-logo.png"
import { FirebaseContext } from "../../store/Context"
import "./Signup.css"

export default function Signup() {
	const [username, setUsername] = useState("")
	const [email, setEmail] = useState("")
	const [phone, setPhone] = useState("")
	const [password, setPassword] = useState("")
	const [err, setErr] = useState("")
	const history = useHistory()
	const { firebase } = useContext(FirebaseContext)
	const submitHandler = (e) => {
		e.preventDefault()
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then((result) => {
				result.user.updateProfile({ displayName: username }).then(() => {
					firebase
						.firestore()
						.collection("users")
						.add({
							id: result.user.uid,
							username: username,
							phone: phone,
						})
						.then(() => {
							history.push("/login")
						})
				})
			})
			.catch((err) => {
				setErr(err.message)
				console.log(err.message)
			})
	}
	return (
		<div>
			<div>
				<p className="errorDiv">{err}</p>
			</div>
			<div className="signupParentDiv">
				<img width="200px" height="200px" alt="OLX" src={Logo}></img>
				<form onSubmit={submitHandler}>
					<label htmlFor="fname">Username</label>
					<br />
					<input
						className="input"
						type="text"
						value={username}
						onChange={(e) => {
							setUsername(e.target.value)
						}}
						id="fname"
						name="name"
					/>
					<br />
					<label htmlFor="email">Email</label>
					<br />
					<input
						className="input"
						type="email"
						value={email}
						onChange={(e) => {
							setEmail(e.target.value)
						}}
						id="email"
						name="email"
					/>
					<br />
					<label htmlFor="number">Phone</label>
					<br />
					<input
						className="input"
						type="number"
						value={phone}
						onChange={(e) => {
							setPhone(e.target.value)
						}}
						id="number"
						name="phone"
					/>
					<br />
					<label htmlFor="password">Password</label>
					<br />
					<input
						className="input"
						type="password"
						value={password}
						onChange={(e) => {
							setPassword(e.target.value)
						}}
						id="password"
						name="password"
					/>
					<br />
					<br />
					<button>Signup</button>
				</form>
				<a
					onClick={() => {
						history.push("/login")
					}}
				>
					Login
				</a>
			</div>
		</div>
	)
}

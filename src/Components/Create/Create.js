import React, { Fragment, useContext, useState } from "react"
import "./Create.css"
import Header from "../Header/Header"
import { useHistory } from "react-router-dom"
import { FirebaseContext,AuthContext } from "../../store/Context"
const Create = () => {
	const { firebase } = useContext(FirebaseContext)
	const { user } = useContext(AuthContext)
	const [name, setName] = useState("")
	const [category, setCategory] = useState("")
	const [price, setPrice] = useState("")
	const [image, setImage] = useState(null)
  const history = useHistory()
  const date = new Date()
	const submitHandler = () => {
		firebase
			.storage()
			.ref(`/image/${image.name}`)
			.put(image)
			.then(({ ref }) => {
				ref.getDownloadURL().then((url) => {
					console.log(url)
					firebase.firestore().collection("products").add({
						name,
						category,
						price,
						url,
						userId: user.uid,
            createdAt: date.toDateString()
					})
          history.push('/')
				})
			})
	}
	return (
		<Fragment>
			<Header />
			<card>
				<div className="centerDiv">
					<label htmlFor="fname">Name</label>
					<br />
					<input
						className="input"
						type="text"
						id="fname"
						value={name}
						onChange={(e) => {
							setName(e.target.value)
						}}
						name="Name"
						defaultValue="John"
					/>
					<br />
					<label htmlFor="category">Category</label>
					<br />
					<input
						className="input"
						type="text"
						id="category"
						value={category}
						onChange={(e) => {
							setCategory(e.target.value)
						}}
						name="category"
						defaultValue="John"
					/>
					<br />
					<label htmlFor="price">Price</label>
					<br />
					<input
						className="input"
						type="number"
						id="price"
						value={price}
						onChange={(e) => {
							setPrice(e.target.value)
						}}
						name="Price"
					/>
					<br />
					<br />
					<img
						alt="Posts"
						width="200px"
						height="200px"
						src={image ? URL.createObjectURL(image) : ""}
					></img>
					<br />
					<input
						onChange={(e) => {
							setImage(e.target.files[0])
						}}
						type="file"
					/>
					<br />
					<button onClick={submitHandler} className="uploadBtn">
						upload and Submit
					</button>
				</div>
			</card>
		</Fragment>
	)
}

export default Create

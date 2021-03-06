import React, { Fragment, useContext, useState } from "react"
import "./Create.css"
import Header from "../Header/Header"
import { useHistory } from "react-router-dom"
import { FirebaseContext, AuthContext } from "../../store/Context"
import Swal from "sweetalert2"
const Create = () => {
	const { firebase } = useContext(FirebaseContext)
	const { user } = useContext(AuthContext)
	const [name, setName] = useState("")
	const [category, setCategory] = useState("")
	const [price, setPrice] = useState()
	const [image, setImage] = useState(null)
	const [err, setErr] = useState("")
	const history = useHistory()
	const date = new Date()
	const submitHandler = () => {
		if (name.length > 2 && category.length > 3 && price > 10 && image) {
			firebase
				.storage()
				.ref(`/image/${image.name}`)
				.put(image)
				.then(({ ref }) => {
					ref.getDownloadURL()
						.then((url) => {
							firebase.firestore().collection("products").add({
								name,
								category,
								price,
								url,
								userId: user.uid,
								createdAt: date.toDateString(),
							})
							Swal.fire("Product added")
							history.push("/")
						})
						.catch((err) => {
							setErr(err.message)
							console.log(err.message)
						})
				})
				.catch((err) => {
					setErr(err.message)
					console.log(err.message)
				})
		} else {
			if (name.length < 2) setErr("Provide a proper name")
			if (category.length < 3) setErr("Set a category")
			if (price < 5) setErr("Provide proper amount")
			if (!price) setErr("Set a price")
			if (!image) setErr("Upload an image")
			if (!image) setErr("Provide an image")
			if (category.length < 3) setErr("Provide a category")
			if (name.length < 2) setErr("Provide a name for the product")
		}
	}
	return (
		<Fragment>
			<Header />

			<div>
				<div className="centerDiv">
					<div>
						<p className="errDiv">{err}</p>
					</div>
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
			</div>
		</Fragment>
	)
}

export default Create

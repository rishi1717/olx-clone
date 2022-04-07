import React,{useContext} from 'react';
import Swal from 'sweetalert2'

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext, FirebaseContext } from '../../store/Context'
import { useHistory } from 'react-router-dom'
function Header() {
  const history = useHistory()
  const {user} = useContext(AuthContext)
  const {firebase} = useContext(FirebaseContext)
  return (
		<div className="headerParentDiv">
			<div className="headerChildDiv">
				<div 
					onClick={() => {
						history.push("/")
					}}
					className="brandName"
				>
					<OlxLogo></OlxLogo>
				</div>
				<div className="placeSearch">
					<Search></Search>
					<input type="text" value="India" onChange={()=>{}}/>
					<Arrow></Arrow>
				</div>
				<div className="productSearch">
					<div className="input">
						<input
							type="text"
							placeholder="Find car,mobile phone and more..."
						/>
					</div>
					<div className="searchAction">
						<Search color="#ffffff"></Search>
					</div>
				</div>
				<div className="language">
					<span> ENGLISH </span>
					<Arrow></Arrow>
				</div>
				<div className="loginPage">
					<div>{user ? `Welcome ${user.displayName}` : <button onClick={()=>{
						history.push('/login')
					}}>"Login"</button>}</div>
					<hr />
				</div>
				<div>
					{user && (
						<button
							onClick={() => {
								Swal.fire({
									title: "Logout?",
									showCancelButton: true,
									confirmButtonColor: "#3085d6",
									cancelButtonColor: "#d33",
									confirmButtonText: "Logout",
								}).then((result) => {
									if (result.isConfirmed) {
										firebase.auth().signOut()
										history.push("/login")
									}
								})
								
							}}
						>
							Logout
						</button>
					)}
				</div>
				<div className="sellMenu">
					<SellButton></SellButton>
					<div className="sellMenuContent">
						<SellButtonPlus></SellButtonPlus>
						<span
							onClick={() => {
								history.push("/create")
							}}
						>
							SELL
						</span>
					</div>
				</div>
			</div>
		</div>
  )
}

export default Header;

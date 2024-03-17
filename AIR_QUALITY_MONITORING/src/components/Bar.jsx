/* eslint-disable react/prop-types */
import { BsSearch } from "react-icons/bs";
// import { FaBell } from "react-icons/fa";
// import { MdGTranslate } from "react-icons/md";
import { BiTargetLock } from "react-icons/bi";
import GoogleTranslate from "../components/GoogleTranslate";

function Bar({ query, setQuery }) {
	return (
		<div className="bar">
			<div>
				<BsSearch />
				<input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search Location City or Area" />
				<BiTargetLock style={{ color: "blue", fontSize: "2.4rem" }} />
			</div>
			<article>
				{/* <i>
					<MdGTranslate />
				</i> */}
				{/* <i>
					<FaBell />
				</i> */}
				{/* <img
					src="https://upload.wikimedia.org/wikipedia/en/thumb/e/e2/IMG_Academy_Logo.svg/640px-IMG_Academy_Logo.svg.png"
					alt="user iamge"
				/> */}
				<GoogleTranslate />
				{/* <button>Login</button> */}
				{/* <div className="language-select d-flex">
					<span className="fa fa-language" aria-hidden="true"></span>
					<div id="google_translate_element"></div>
				</div> */}
			</article>
		</div>
	);
}

export default Bar;

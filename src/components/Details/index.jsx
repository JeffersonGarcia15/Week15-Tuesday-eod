import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleScientistCreator } from "../../store/scientist";
export function Details() {
	const dispatch = useDispatch();
	const scientist = useSelector((state) => state.scientists.singleScientist);
	const { id } = useParams();

	useEffect(() => {
		async function fetchData() {
			const response = await fetch(`http://localhost:5000/scientists/${id}`);
			const scientist = await response.json();
			dispatch(getSingleScientistCreator(scientist));
		}
		fetchData();
	}, []);

	console.log("%c this is the scientist", "color:pink; font-size: 16px; font-weight: bold;", scientist);

	return (
		<div>
			<h3>{scientist.name}</h3>
			<p>{scientist.biography}</p>
		</div>
	);
}


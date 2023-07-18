import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllScientistsCreator } from "../../store/scientist";
import { NavLink } from "react-router-dom";

export function Home() {
	const dispatch = useDispatch();
	// const scientists = useSelector((state) => state.scientists); Do this to demo that we need to key into allScientists
	const scientists = useSelector((state) => state.scientists.allScientists);
    
	useEffect(() => {
		async function fetchData() {
			const response = await fetch("http://localhost:5000/scientists");
			const scientists = await response.json();
			dispatch(getAllScientistsCreator(scientists));
		}
		fetchData();
	}, []);

	return (
		<ul>
			{Object.values(scientists).map((scientist) => (
				<NavLink to={`/scientist/${scientist.id}`} key={scientist.id}>{scientist.name}</NavLink>
			))}
		</ul>
	);
}


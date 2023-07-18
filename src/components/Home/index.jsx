import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllScientistsCreator, createScientistCreator } from "../../store/scientist";
import { NavLink } from "react-router-dom";

export function Home() {
	const dispatch = useDispatch();
	const [name, setName] = useState("");
	const [biography, setBiography] = useState("");
	const [addScientist, setAddScientist] = useState(false);
	const [validationErrors, setValidationErrors] = useState({});
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

	useEffect(() => {
		const errors = {};
		if (name.length < 3) {
			errors.name = "Name must be at least 3 characters long.";
		}
		if (biography.length < 10) {
			errors.biography = "Biography must be at least 10 characters long.";
		}
		setValidationErrors(errors);
	},[name, biography]);

	async function addScientistFunction(e) {
		e.preventDefault();
		const response = await fetch("http://localhost:5000/scientists", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name, biography }),
            
		});
		const scientist = await response.json();
		dispatch(createScientistCreator(scientist));
		setAddScientist(false);
		setName("");
		setBiography("");
	}

	return (
		<>
			<ul>
				{Object.values(scientists).map((scientist) => (
					<NavLink to={`/scientist/${scientist.id}`} key={scientist.id}>{scientist.name}</NavLink>
				))}
			</ul>
			<button onClick={() => setAddScientist((prev) => !prev)}>Add Scientist</button>
			{addScientist && (
				<form onSubmit={addScientistFunction}>
					<input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
					<input type="text" placeholder="Biography" value={biography} onChange={(e) => setBiography(e.target.value)} />
					<button disabled={Object.values(validationErrors).length}>Add Scientist</button>
				</form>
			)}
		</>
	);
}


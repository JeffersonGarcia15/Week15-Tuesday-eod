/* eslint-disable no-unused-vars */
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleScientistCreator, updateScientistCreator, deleteScientistCreator } from "../../store/scientist";
export function Details() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const scientist = useSelector((state) => state.scientists.singleScientist);
	const { id } = useParams();
	const [name, setName] = useState(scientist?.name);
	const [biography, setBiography] = useState(scientist?.biography);
	const [updateScientist, setUpdateScientist] = useState(false);
	const [deleteScientist, setDeleteScientist] = useState(false);

	useEffect(() => {
		async function fetchData() {
			const response = await fetch(`http://localhost:5000/scientists/${id}`);
			const scientist = await response.json();
			dispatch(getSingleScientistCreator(scientist));
		}
		fetchData();
	}, []);

	useEffect(() => {
		setName(scientist?.name);
		setBiography(scientist?.biography);
	}, [scientist]);

	async function updateScientistInformation(e) {
		e.preventDefault();
		const response = await fetch(`http://localhost:5000/scientists/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ id, name, biography }),
		});
		const scientist = await response.json();
		dispatch(updateScientistCreator(scientist));
		setUpdateScientist(false);
	}

	async function deleteScientistFunction() {
		await fetch(`http://localhost:5000/scientists/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		});
		dispatch(deleteScientistCreator(id));
		setDeleteScientist(false);
		navigate("/");
	}

	return (
		<div>
			<h3>{scientist.name}</h3>
			<p>{scientist.biography}</p>
			<button onClick={() => setUpdateScientist((prev) => !prev)}>Edit</button>
			{updateScientist && (
				<>
					<form onSubmit={updateScientistInformation}>
						<input type="text" value={name} onChange={(e) => setName(e.target.value)} />
						<input type="text" value={biography} onChange={(e) => setBiography(e.target.value)} />
						<button type="submit">Submit</button>
					</form>
				</>
			)}
			<button onClick={() => setDeleteScientist((prev) => !prev)}>Delete</button>
			{deleteScientist && (
				<button onClick={() => deleteScientistFunction()}>Are you sure you want to delete this?</button>
			)}
		</div>
	);
}


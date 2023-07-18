const GET_ALL_SCIENTISTS = "GET_ALL_SCIENTISTS";
const GET_SINGLE_SCIENTIST = "GET_SINGLE_SCIENTIST";
const UPDATE_SINGLE_SCIENTIST = "UPDATE_SINGLE_SCIENTIST";
const DELETE_SCIENTIST = "DELETE_SCIENTIST";
const CREATE_SCIENTIST = "CREATE_SCIENTIST";

export function getAllScientistsCreator(scientists) {
	return {
		type: GET_ALL_SCIENTISTS,
		scientists,
	};
}

export function getSingleScientistCreator(scientist) {
	return {
		type: GET_SINGLE_SCIENTIST,
		scientist,
	};
}

export function updateScientistCreator(scientist) {
	return {
		type: UPDATE_SINGLE_SCIENTIST,
		scientist,
	};
}

export function deleteScientistCreator(id) {
	return {
		type: DELETE_SCIENTIST,
		id,
	};
}

export function createScientistCreator(scientist) {
	return {
		type: CREATE_SCIENTIST,
		scientist,
	};
}

const initialState = { allScientists: {}, singleScientist: {} };
export function scientistReducer(state = initialState, action) {
	let newState;
	switch (action.type) {
	case GET_ALL_SCIENTISTS:
		// newState = { ...state, allScientists: {}}; 
		newState = structuredClone(state);
		action.scientists.forEach((scientist) => {
			newState.allScientists[scientist.id] = scientist;
		});
		return newState;
	case GET_SINGLE_SCIENTIST:
		// newState = { ...state, singleScientist: {} };
		newState = structuredClone(state);
		newState.singleScientist = action.scientist;
		return newState;
	case UPDATE_SINGLE_SCIENTIST:
		// newState = { ...state, singleScientist: {} };
		newState = structuredClone(state);
		newState.singleScientist = action.scientist;
		return newState;
	case DELETE_SCIENTIST:
		newState = structuredClone(state);
		newState.singleScientist = {};
		delete newState.allScientists[action.id];
		return newState;
	case CREATE_SCIENTIST:
		newState = structuredClone(state);
		newState.allScientists[action.scientist.id] = action.scientist;
		return newState;
	default:
		return state;
	}
}
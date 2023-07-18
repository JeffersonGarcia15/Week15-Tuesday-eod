const GET_ALL_SCIENTISTS = "GET_ALL_SCIENTISTS";
const GET_SINGLE_SCIENTIST = "GET_SINGLE_SCIENTIST";

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
	default:
		return state;
	}
}
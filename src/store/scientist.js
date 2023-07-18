const GET_ALL_SCIENTISTS = "GET_ALL_SCIENTISTS";

export function getAllScientistsCreator(scientists) {
	return {
		type: GET_ALL_SCIENTISTS,
		scientists,
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
	default:
		return state;
	}
}
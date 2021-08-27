const initialState = {
  requestingFetchNovelties: false,
  successfulFetchNovelties: false,
  errorFetchNovelties: false,
  novelties: {},
  requestingCreateNovelty: false,
  successfulCreateNovelty: false,
  errorsCreateNovelty: false,
  novelty: null,
  requestingReadNovelty: false,
  successfulReadNovelty: false,
  errorsReadNovelty: false,
  rowEdited: null,
  requestingDeleteNovelty: false,
  successfulDeleteNovelty: false,
  errorsDeleteNovelty: false,
  rowDeleted: null,
  requestingUpdateNovelty: false,
  successfulUpdateNovelty: false,
  errorsUpdateNovelty: false,
  rowUpdated: null,
};

const noveltyReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_NOVELTIES_REQUESTING":
      return {
        ...state,
        requestingFetchNovelties: true,
        successfulFetchNovelties: false,
        errorsFetchNovelties: false,
      };
    case "FETCH_NOVELTY_SUCCESS":
      return {
        ...state,
        errorFetchNovelties: false,
        requestingFetchNovelties: false,
        successfulFetchNovelties: true,
        novelties: action.value,
      };
    case "FETCH_NOVELTY_ERROR":
      return {
        ...state,
        errorFetchNovelties: true,
        requestingFetchNovelties: false,
        successfulFetchNovelties: false,
      };
    case "CREATE_NOVELTY_REQUESTING":
      return {
        ...state,
        requestingCreateNovelty: true,
        successfulCreateNovelty: false,
        errorsCreateNovelty: false,
      };
    case "CREATE_NOVELTY_SUCCESS":
      return {
        ...state,
        errorsCreateNovelty: false,
        requestingCreateNovelty: false,
        successfulCreateNovelty: true,
        novelty: action.value,
      };
    case "CREATE_NOVELTY_ERROR":
      return {
        ...state,
        errorsCreateNovelty: true,
        requestingCreateNovelty: false,
        successfulCreateNovelty: false,
      };
    case "READ_NOVELTY_REQUESTING":
      return {
        ...state,
        requestingReadNovelty: true,
        successfulReadNovelty: false,
        errorsReadNovelty: false,
      };
    case "READ_NOVELTY_SUCCESS":
      return {
        ...state,
        errorsReadNovelty: false,
        requestingReadNovelty: false,
        successfulReadNovelty: true,
        rowEdited: action.value,
      };
    case "READ_NOVELTY_ERROR":
      return {
        ...state,
        errorsReadNovelty: true,
        requestingReadNovelty: false,
        successfulReadNovelty: false,
      };
    case "DELETE_NOVELTY_REQUESTING":
      return {
        ...state,
        requestingDeleteNovelty: true,
        successfulDeleteNovelty: false,
        errorsDeleteNovelty: false,
      };
    case "DELETE_NOVELTY_SUCCESS":
      return {
        ...state,
        errorsDeleteNovelty: false,
        requestingDeleteNovelty: false,
        successfulDeleteNovelty: true,
        rowDeleted: action.value,
      };
    case "DELETE_NOVELTY_ERROR":
      return {
        ...state,
        errorsDeleteNovelty: true,
        requestingDeleteNovelty: false,
        successfulDeleteNovelty: false,
      };
    case "UPDATE_NOVELTY_REQUESTING":
      return {
        ...state,
        requestingUpdateNovelty: true,
        successfulUpdateNovelty: false,
        errorsUpdateNovelty: false,
      };
    case "UPDATE_NOVELTY_SUCCESS":
      return {
        ...state,
        errorsUpdateNovelty: false,
        requestingUpdateNovelty: false,
        successfulUpdateNovelty: true,
        rowUpdated: action.value,
      };
    case "UPDATE_NOVELTY_ERROR":
      return {
        ...state,
        errorsUpdateNovelty: true,
        requestingUpdateNovelty: false,
        successfulUpdateNovelty: false,
      };
    case "RESET_NOVELTY_FORM":
      return {
        ...state,
        requestingCreateNovelty: false,
        successfulCreateNovelty: false,
        errorsCreateNovelty: false,
        novelty: null,
        requestingReadNovelty: false,
        successfulReadNovelty: false,
        errorsReadNovelty: false,
        rowEdited: null,
        requestingDeleteNovelty: false,
        successfulDeleteNovelty: false,
        errorsDeleteNovelty: false,
        rowDeleted: null,
        requestingUpdateNovelty: false,
        successfulUpdateNovelty: false,
        errorsUpdateNovelty: false,
        rowUpdated: null,
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

export default noveltyReducer;

const initialState = {
  requestingFetchZoneNeighborhoods: false,
  successfulFetchZoneNeighborhoods: false,
  errorFetchZoneNeighborhoods: false,
  zoneNeighborhoods: {},
  requestingCreateZoneNeighborhood: false,
  successfulCreateZoneNeighborhood: false,
  errorsCreateZoneNeighborhood: false,
  zoneNeighborhood: null,
  requestingReadZoneNeighborhood: false,
  successfulReadZoneNeighborhood: false,
  errorsReadZoneNeighborhood: false,
  rowEdited: null,
  requestingDeleteZoneNeighborhood: false,
  successfulDeleteZoneNeighborhood: false,
  errorsDeleteZoneNeighborhood: false,
  rowDeleted: null,
  requestingUpdateZoneNeighborhood: false,
  successfulUpdateZoneNeighborhood: false,
  errorsUpdateZoneNeighborhood: false,
  rowUpdated: null,
  zoneNeighborhoodsByNeighborhood: [],
  requestingReadZoneNeighborhoodsByNeighborhood: false,
  successfulReadZoneNeighborhoodsByNeighborhood: false,
  errorsReadZoneNeighborhoodsByNeighborhood: false,
};

const zoneNeighborhoodReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_ZONENEIGHBORHOODS_REQUESTING":
      return {
        ...state,
        requestingFetchZoneNeighborhoods: true,
        successfulFetchZoneNeighborhoods: false,
        errorsFetchZoneNeighborhoods: false,
      };
    case "FETCH_ZONENEIGHBORHOOD_SUCCESS":
      return {
        ...state,
        errorFetchZoneNeighborhoods: false,
        requestingFetchZoneNeighborhoods: false,
        successfulFetchZoneNeighborhoods: true,
        zoneNeighborhoods: action.value,
      };
    case "FETCH_ZONENEIGHBORHOOD_ERROR":
      return {
        ...state,
        errorFetchZoneNeighborhoods: true,
        requestingFetchZoneNeighborhoods: false,
        successfulFetchZoneNeighborhoods: false,
      };
    case "CREATE_ZONENEIGHBORHOOD_REQUESTING":
      return {
        ...state,
        requestingCreateZoneNeighborhood: true,
        successfulCreateZoneNeighborhood: false,
        errorsCreateZoneNeighborhood: false,
      };
    case "CREATE_ZONENEIGHBORHOOD_SUCCESS":
      return {
        ...state,
        errorsCreateZoneNeighborhood: false,
        requestingCreateZoneNeighborhood: false,
        successfulCreateZoneNeighborhood: true,
        zoneNeighborhood: action.value,
      };
    case "CREATE_ZONENEIGHBORHOOD_ERROR":
      return {
        ...state,
        errorsCreateZoneNeighborhood: true,
        requestingCreateZoneNeighborhood: false,
        successfulCreateZoneNeighborhood: false,
      };
    case "READ_ZONENEIGHBORHOOD_REQUESTING":
      return {
        ...state,
        requestingReadZoneNeighborhood: true,
        successfulReadZoneNeighborhood: false,
        errorsReadZoneNeighborhood: false,
      };
    case "READ_ZONENEIGHBORHOOD_SUCCESS":
      return {
        ...state,
        errorsReadZoneNeighborhood: false,
        requestingReadZoneNeighborhood: false,
        successfulReadZoneNeighborhood: true,
        rowEdited: action.value,
      };
    case "READ_ZONENEIGHBORHOOD_ERROR":
      return {
        ...state,
        errorsReadZoneNeighborhood: true,
        requestingReadZoneNeighborhood: false,
        successfulReadZoneNeighborhood: false,
      };
    case "DELETE_ZONENEIGHBORHOOD_REQUESTING":
      return {
        ...state,
        requestingDeleteZoneNeighborhood: true,
        successfulDeleteZoneNeighborhood: false,
        errorsDeleteZoneNeighborhood: false,
      };
    case "DELETE_ZONENEIGHBORHOOD_SUCCESS":
      return {
        ...state,
        errorsDeleteZoneNeighborhood: false,
        requestingDeleteZoneNeighborhood: false,
        successfulDeleteZoneNeighborhood: true,
        rowDeleted: action.value,
      };
    case "DELETE_ZONENEIGHBORHOOD_ERROR":
      return {
        ...state,
        errorsDeleteZoneNeighborhood: true,
        requestingDeleteZoneNeighborhood: false,
        successfulDeleteZoneNeighborhood: false,
      };
    case "UPDATE_ZONENEIGHBORHOOD_REQUESTING":
      return {
        ...state,
        requestingUpdateZoneNeighborhood: true,
        successfulUpdateZoneNeighborhood: false,
        errorsUpdateZoneNeighborhood: false,
      };
    case "UPDATE_ZONENEIGHBORHOOD_SUCCESS":
      return {
        ...state,
        errorsUpdateZoneNeighborhood: false,
        requestingUpdateZoneNeighborhood: false,
        successfulUpdateZoneNeighborhood: true,
        rowUpdated: action.value,
      };
    case "UPDATE_ZONENEIGHBORHOOD_ERROR":
      return {
        ...state,
        errorsUpdateZoneNeighborhood: true,
        requestingUpdateZoneNeighborhood: false,
        successfulUpdateZoneNeighborhood: false,
      };
    case "RESET_ZONENEIGHBORHOOD_FORM":
      return {
        ...state,
        requestingCreateZoneNeighborhood: false,
        successfulCreateZoneNeighborhood: false,
        errorsCreateZoneNeighborhood: false,
        zoneNeighborhood: null,
        requestingReadZoneNeighborhood: false,
        successfulReadZoneNeighborhood: false,
        errorsReadZoneNeighborhood: false,
        rowEdited: null,
        requestingDeleteZoneNeighborhood: false,
        successfulDeleteZoneNeighborhood: false,
        rowDeleted: null,
        requestingUpdateZoneNeighborhood: false,
        successfulUpdateZoneNeighborhood: false,
        errorsUpdateZoneNeighborhood: false,
        rowUpdated: null,
        zoneNeighborhoodsByNeighborhood: [],
        requestingReadZoneNeighborhoodsByNeighborhood: false,
        successfulReadZoneNeighborhoodsByNeighborhood: false,
        errorsReadZoneNeighborhoodsByNeighborhood: false,
      };
    case "READBYNEIGHBORHOOD_ZONENEIGHBORHOOD_REQUESTING":
      return {
        ...state,
        requestingReadZoneNeighborhoodsByNeighborhood: true,
        successfulReadZoneNeighborhoodsByNeighborhood: false,
        errorsReadZoneNeighborhoodsByNeighborhood: false,
      };
    case "READBYNEIGHBORHOOD_ZONENEIGHBORHOOD_SUCCESS":
      return {
        ...state,
        errorsReadZoneNeighborhoodsByNeighborhood: false,
        requestingReadZoneNeighborhoodsByNeighborhood: false,
        successfulReadZoneNeighborhoodsByNeighborhood: true,
        zoneNeighborhoodsByNeighborhood: action.value,
      };
    case "READBYNEIGHBORHOOD_ZONENEIGHBORHOOD_ERROR":
      return {
        ...state,
        errorsReadZoneNeighborhoodsByNeighborhood: true,
        requestingReadZoneNeighborhoodsByNeighborhood: false,
        successfulReadZoneNeighborhoodsByNeighborhood: false,
      };
    case "RESET_BYZONE_NEIGHBORHOOD":
      return {
        ...state,
        errorsReadNeighborhoodsByZone: false,
        requestingReadNeighborhoodsByZone: false,
        successfulReadNeighborhoodsByZone: false,
        neighborhoodsByZone: [],
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

export default zoneNeighborhoodReducer;

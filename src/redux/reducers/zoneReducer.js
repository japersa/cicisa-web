const initialState = {
  requestingFetchZones: false,
  successfulFetchZones: false,
  errorFetchZones: false,
  zones: {},
  requestingCreateZone: false,
  successfulCreateZone: false,
  errorsCreateZone: false,
  zone: null,
  requestingReadZone: false,
  successfulReadZone: false,
  errorsReadZone: false,
  rowEdited: null,
  requestingDeleteZone: false,
  successfulDeleteZone: false,
  errorsDeleteZone: false,
  rowDeleted: null,
  requestingUpdateZone: false,
  successfulUpdateZone: false,
  errorsUpdateZone: false,
  rowUpdated: null,
  requestingUploadFileZone: false,
  successfulUploadFileZone: false,
  errorsUploadFileZone: false,
  fileUploaded: null,
  zonesByCity: [],
  requestingReadZonesByCity: false,
  successfulReadZonesByCity: false,
  errorsReadZonesByCity: false,
};

const zoneReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_ZONES_REQUESTING":
      return {
        ...state,
        requestingFetchZones: true,
        successfulFetchZones: false,
        errorsFetchZones: false,
      };
    case "FETCH_ZONE_SUCCESS":
      return {
        ...state,
        errorFetchZones: false,
        requestingFetchZones: false,
        successfulFetchZones: true,
        zones: action.value,
      };
    case "FETCH_ZONE_ERROR":
      return {
        ...state,
        errorFetchZones: true,
        requestingFetchZones: false,
        successfulFetchZones: false,
      };
    case "CREATE_ZONE_REQUESTING":
      return {
        ...state,
        requestingCreateZone: true,
        successfulCreateZone: false,
        errorsCreateZone: false,
      };
    case "CREATE_ZONE_SUCCESS":
      return {
        ...state,
        errorsCreateZone: false,
        requestingCreateZone: false,
        successfulCreateZone: true,
        zone: action.value,
      };
    case "CREATE_ZONE_ERROR":
      return {
        ...state,
        errorsCreateZone: true,
        requestingCreateZone: false,
        successfulCreateZone: false,
      };
    case "READ_ZONE_REQUESTING":
      return {
        ...state,
        requestingReadZone: true,
        successfulReadZone: false,
        errorsReadZone: false,
      };
    case "READ_ZONE_SUCCESS":
      return {
        ...state,
        errorsReadZone: false,
        requestingReadZone: false,
        successfulReadZone: true,
        rowEdited: action.value,
      };
    case "READ_ZONE_ERROR":
      return {
        ...state,
        errorsReadZone: true,
        requestingReadZone: false,
        successfulReadZone: false,
      };
    case "DELETE_ZONE_REQUESTING":
      return {
        ...state,
        requestingDeleteZone: true,
        successfulDeleteZone: false,
        errorsDeleteZone: false,
      };
    case "DELETE_ZONE_SUCCESS":
      return {
        ...state,
        errorsDeleteZone: false,
        requestingDeleteZone: false,
        successfulDeleteZone: true,
        rowDeleted: action.value,
      };
    case "DELETE_ZONE_ERROR":
      return {
        ...state,
        errorsDeleteZone: true,
        requestingDeleteZone: false,
        successfulDeleteZone: false,
      };
    case "UPDATE_ZONE_REQUESTING":
      return {
        ...state,
        requestingUpdateZone: true,
        successfulUpdateZone: false,
        errorsUpdateZone: false,
      };
    case "UPDATE_ZONE_SUCCESS":
      return {
        ...state,
        errorsUpdateZone: false,
        requestingUpdateZone: false,
        successfulUpdateZone: true,
        rowUpdated: action.value,
      };
    case "UPDATE_ZONE_ERROR":
      return {
        ...state,
        errorsUpdateZone: true,
        requestingUpdateZone: false,
        successfulUpdateZone: false,
      };
    case "UPLOAD_ZONE_REQUESTING":
      return {
        ...state,
        requestingUploadFileZone: true,
        successfulUploadFileZone: false,
        errorsUploadFileZone: false,
      };
    case "UPLOAD_ZONE_SUCCESS":
      return {
        ...state,
        errorsUploadFileZone: false,
        requestingUploadFileZone: false,
        successfulUploadFileZone: true,
        fileUploaded: action.value,
      };
    case "UPLOAD_ZONE_ERROR":
      return {
        ...state,
        errorsUploadFileZone: true,
        requestingUploadFileZone: false,
        successfulUploadFileZone: false,
      };
    case "READBYCITY_ZONE_REQUESTING":
      return {
        ...state,
        requestingReadZonesByCity: true,
        successfulReadZonesByCity: false,
        errorsReadZonesByCity: false,
      };
    case "READBYCITY_ZONE_SUCCESS":
      return {
        ...state,
        errorsReadZonesByCity: false,
        requestingReadZonesByCity: false,
        successfulReadZonesByCity: true,
        zonesByCity: action.value,
      };
    case "READBYCITY_ZONE_ERROR":
      return {
        ...state,
        errorsReadZonesByCity: true,
        requestingReadZonesByCity: false,
        successfulReadZonesByCity: false,
      };
    case "RESET_ZONE_FORM":
      return {
        ...state,
        requestingCreateZone: false,
        successfulCreateZone: false,
        errorsCreateZone: false,
        zone: null,
        requestingReadZone: false,
        successfulReadZone: false,
        errorsReadZone: false,
        rowEdited: null,
        requestingDeleteZone: false,
        successfulDeleteZone: false,
        rowDeleted: null,
        requestingUpdateZone: false,
        successfulUpdateZone: false,
        errorsUpdateZone: false,
        rowUpdated: null,
        requestingUploadFileZone: false,
        successfulUploadFileZone: false,
        errorsUploadFileZone: false,
        fileUploaded: null,
        zonesByCity: [],
        requestingReadZonesByCity: false,
        successfulReadZonesByCity: false,
        errorsReadZonesByCity: false,
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

export default zoneReducer;

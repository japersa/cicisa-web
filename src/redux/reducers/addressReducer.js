const initialState = {
  requestingFetchAddresses: false,
  successfulFetchAddresses: false,
  errorFetchAddresses: false,
  addresses: {},
  requestingCreateAddress: false,
  successfulCreateAddress: false,
  errorsCreateAddress: false,
  address: null,
  requestingReadAddress: false,
  successfulReadAddress: false,
  errorsReadAddress: false,
  rowEdited: null,
  requestingDeleteAddress: false,
  successfulDeleteAddress: false,
  errorsDeleteAddress: false,
  rowDeleted: null,
  requestingUpdateAddress: false,
  successfulUpdateAddress: false,
  errorsUpdateAddress: false,
  rowUpdated: null,
  requestingUploadFileAddress: false,
  successfulUploadFileAddress: false,
  errorsUploadFileAddress: false,
  fileUploaded: null,
  requestingFetchAvailableAddresses: false,
  successfulFetchAvailableAddresses: false,
  errorFetchAvailableAddresses: false,
  addressesAvailable: {},
  requestingFetchAddressesByCity: false,
  successfulFetchAddressesByCity: false,
  errorFetchAddressesByCity: false,
  addressesByCity: {},
  requestingFetchAddressesByZone: false,
  successfulFetchAddressesByZone: false,
  errorFetchAddressesByZone: false,
  addressesByZone: {},
};

const addressReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_ADDRESSES_REQUESTING":
      return {
        ...state,
        requestingFetchAddresses: true,
        successfulFetchAddresses: false,
        errorFetchAddresses: false,
      };
    case "FETCH_ADDRESS_SUCCESS":
      return {
        ...state,
        errorFetchAddresses: false,
        requestingFetchAddresses: false,
        successfulFetchAddresses: true,
        addresses: action.value,
      };
    case "FETCH_ADDRESS_ERROR":
      return {
        ...state,
        errorFetchAddresses: true,
        requestingFetchAddresses: false,
        successfulFetchAddresses: false,
      };
    case "CREATE_ADDRESS_REQUESTING":
      return {
        ...state,
        requestingCreateAddress: true,
        successfulCreateAddress: false,
        errorsCreateAddress: false,
      };
    case "CREATE_ADDRESS_SUCCESS":
      return {
        ...state,
        errorsCreateAddress: false,
        requestingCreateAddress: false,
        successfulCreateAddress: true,
        address: action.value,
      };
    case "CREATE_ADDRESS_ERROR":
      return {
        ...state,
        errorsCreateAddress: true,
        requestingCreateAddress: false,
        successfulCreateAddress: false,
      };
    case "READ_ADDRESS_REQUESTING":
      return {
        ...state,
        requestingReadAddress: true,
        successfulReadAddress: false,
        errorsReadAddress: false,
      };
    case "READ_ADDRESS_SUCCESS":
      return {
        ...state,
        errorsReadAddress: false,
        requestingReadAddress: false,
        successfulReadAddress: true,
        rowEdited: action.value,
      };
    case "READ_ADDRESS_ERROR":
      return {
        ...state,
        errorsReadAddress: true,
        requestingReadAddress: false,
        successfulReadAddress: false,
      };
    case "DELETE_ADDRESS_REQUESTING":
      return {
        ...state,
        requestingDeleteAddress: true,
        successfulDeleteAddress: false,
        errorsDeleteAddress: false,
      };
    case "DELETE_ADDRESS_SUCCESS":
      return {
        ...state,
        errorsDeleteAddress: false,
        requestingDeleteAddress: false,
        successfulDeleteAddress: true,
        rowDeleted: action.value,
      };
    case "DELETE_ADDRESS_ERROR":
      return {
        ...state,
        errorsDeleteAddress: true,
        requestingDeleteAddress: false,
        successfulDeleteAddress: false,
      };
    case "UPDATE_ADDRESS_REQUESTING":
      return {
        ...state,
        requestingUpdateAddress: true,
        successfulUpdateAddress: false,
        errorsUpdateAddress: false,
      };
    case "UPDATE_ADDRESS_SUCCESS":
      return {
        ...state,
        errorsUpdateAddress: false,
        requestingUpdateAddress: false,
        successfulUpdateAddress: true,
        rowUpdated: action.value,
      };
    case "UPDATE_ADDRESS_ERROR":
      return {
        ...state,
        errorsUpdateAddress: true,
        requestingUpdateAddress: false,
        successfulUpdateAddress: false,
      };
    case "UPLOAD_ADDRESS_REQUESTING":
      return {
        ...state,
        requestingUploadFileAddress: true,
        successfulUploadFileAddress: false,
        errorsUploadFileAddress: false,
      };
    case "UPLOAD_ADDRESS_SUCCESS":
      return {
        ...state,
        errorsUploadFileAddress: false,
        requestingUploadFileAddress: false,
        successfulUploadFileAddress: true,
        fileUploaded: action.value,
      };
    case "UPLOAD_ADDRESS_ERROR":
      return {
        ...state,
        errorsUploadFileAddress: true,
        requestingUploadFileAddress: false,
        successfulUploadFileAddress: false,
      };
    case "RESET_ADDRESS_FORM":
      return {
        ...state,
        requestingCreateAddress: false,
        successfulCreateAddress: false,
        errorsCreateAddress: false,
        address: null,
        requestingReadAddress: false,
        successfulReadAddress: false,
        errorsReadAddress: false,
        rowEdited: null,
        requestingDeleteAddress: false,
        successfulDeleteAddress: false,
        rowDeleted: null,
        requestingUpdateAddress: false,
        successfulUpdateAddress: false,
        errorsUpdateAddress: false,
        rowUpdated: null,
        requestingUploadFileAddress: false,
        successfulUploadFileAddress: false,
        errorsUploadFileAddress: false,
        fileUploaded: null,
        requestingFetchAvailableAddresses: false,
        successfulFetchAvailableAddresses: false,
        errorFetchAvailableAddresses: false,
        addressesAvailable: {},
      };
    case "RESET":
      return initialState;
    case "FETCH_AVAILABLE_ADDRESSES_REQUESTING":
      return {
        ...state,
        requestingFetchAvailableAddresses: true,
        successfulFetchAvailableAddresses: false,
        errorsFetchAvailableAddresses: false,
      };
    case "FETCH_AVAILABLE_ADDRESS_SUCCESS":
      return {
        ...state,
        errorFetchAvailableAddresses: false,
        requestingFetchAvailableAddresses: false,
        successfulFetchAvailableAddresses: true,
        addressesAvailable: action.value,
      };
    case "FETCH_AVAILABLE_ADDRESS_ERROR":
      return {
        ...state,
        errorFetchAvailableAddresses: true,
        requestingFetchAvailableAddresses: false,
        successfulFetchAvailableAddresses: false,
      };
    case "FETCHBYCITY_ADDRESSES_REQUESTING":
      return {
        ...state,
        requestingFetchAddressesByCity: true,
        successfulFetchAddressesByCity: false,
        errorFetchAddressesByCity: false,
      };
    case "FETCHBYCITY_ADDRESS_SUCCESS":
      return {
        ...state,
        errorFetchAddressesByCity: false,
        requestingFetchAddressesByCity: false,
        successfulFetchAddressesByCity: true,
        addressesByCity: action.value,
      };
    case "FETCHBYCITY_ADDRESS_ERROR":
      return {
        ...state,
        errorFetchAddressesByCity: true,
        requestingFetchAddressesByCity: false,
        successfulFetchAddressesByCity: false,
      };
    case "FETCHBYZONE_ADDRESSES_REQUESTING":
      return {
        ...state,
        requestingFetchAddressesByZone: true,
        successfulFetchAddressesByZone: false,
        errorFetchAddressesByZone: false,
      };
    case "FETCHBYZONE_ADDRESS_SUCCESS":
      return {
        ...state,
        errorFetchAddressesByZone: false,
        requestingFetchAddressesByZone: false,
        successfulFetchAddressesByZone: true,
        addressesByZone: action.value,
      };
    case "FETCHBYZONE_ADDRESS_ERROR":
      return {
        ...state,
        errorFetchAddressesByZone: true,
        requestingFetchAddressesByZone: false,
        successfulFetchAddressesByZone: false,
      };
    default:
      return state;
  }
};

export default addressReducer;

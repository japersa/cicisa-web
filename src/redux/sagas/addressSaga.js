import { call, put, takeLatest } from "redux-saga/effects";
import request from "../../utils/request";

function* getAllAddresses(payload) {
  try {
    yield put({
      type: "FETCH_ADDRESSES_REQUESTING",
    });

    yield put({
      type: "SHOW_LOADING",
    });

    const headers = {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      }),
    };

    const requestURL = `${process.env.REACT_APP_API_URL}/api/v1/addresses?page=${payload.value.page}&search=${payload.value.search}&offset=${payload.value.offset}`;
    const response = yield call(request, requestURL, headers);

    yield put({
      type: "HIDE_LOADING",
    });

    yield put({
      type: "FETCH_ADDRESS_SUCCESS",
      value: response,
    });
  } catch (error) {
    yield put({
      type: "HIDE_LOADING",
    });
    yield put({
      type: "SHOW_ALERT",
      value: {
        type: "danger",
        title: "Falied load",
        message: "Falied load Addresses",
      },
    });
    yield put({
      type: "FETCH_ADDRESS_ERROR",
    });
  }
}

function* postAddress(payload) {
  try {
    yield put({ type: "CREATE_ADDRESS_REQUESTING" });

    yield put({
      type: "SHOW_LOADING",
    });

    const requestURL = `${process.env.REACT_APP_API_URL}/api/v1/addresses`;

    const headers = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload.value),
    };

    const response = yield call(request, requestURL, headers);

    yield put({
      type: "HIDE_LOADING",
    });

    yield put({
      type: "SHOW_ALERT",
      value: {
        type: "success",
        title: "Successful save",
        message: "Successful save Address",
      },
    });

    yield put({
      type: "CREATE_ADDRESS_SUCCESS",
      value: response,
    });
  } catch (error) {
    yield put({
      type: "SHOW_ALERT",
      value: {
        type: "danger",
        title: "Falied save",
        message: "Falied save Address",
      },
    });
    yield put({
      type: "HIDE_LOADING",
    });
    yield put({
      type: "CREATE_ADDRESS_ERROR",
    });
  }
}

function* getAddressById(payload) {
  try {
    yield put({
      type: "READ_ADDRESS_REQUESTING",
    });

    yield put({
      type: "SHOW_LOADING",
    });

    const headers = {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      }),
    };

    const requestURL = `${process.env.REACT_APP_API_URL}/api/v1/addresses/${payload.value.id}`;

    const response = yield call(request, requestURL, headers);

    yield put({
      type: "HIDE_LOADING",
    });

    yield put({
      type: "READ_ADDRESS_SUCCESS",
      value: response,
    });
  } catch (error) {
    yield put({
      type: "HIDE_LOADING",
    });
    yield put({
      type: "READ_ADDRESS_ERROR",
    });
  }
}

function* getAddressByIdCity(payload) {
  try {
    yield put({
      type: "READBYCITY_ADDRESS_REQUESTING",
    });

    yield put({
      type: "SHOW_LOADING",
    });

    const headers = {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      }),
    };

    const requestURL = `${process.env.REACT_APP_API_URL}/api/v1/addresses/city/${payload.value.idCity}`;

    const response = yield call(request, requestURL, headers);

    yield put({
      type: "HIDE_LOADING",
    });

    yield put({
      type: "READBYCITY_ADDRESS_SUCCESS",
      value: response,
    });
  } catch (error) {
    yield put({
      type: "HIDE_LOADING",
    });
    yield put({
      type: "READBYCITY_ADDRESS_ERROR",
    });
  }
}

function* getAddressByIdZone(payload) {
  try {
    yield put({
      type: "READBYZONE_ADDRESS_REQUESTING",
    });

    yield put({
      type: "SHOW_LOADING",
    });

    const headers = {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      }),
    };

    const requestURL = `${process.env.REACT_APP_API_URL}/api/v1/addresses/zone/${payload.value.idZone}`;

    const response = yield call(request, requestURL, headers);

    yield put({
      type: "HIDE_LOADING",
    });

    yield put({
      type: "READBYZONE_ADDRESS_SUCCESS",
      value: response,
    });
  } catch (error) {
    yield put({
      type: "HIDE_LOADING",
    });
    yield put({
      type: "READBYZONE_ADDRESS_ERROR",
    });
  }
}

function* deleteAddressById(payload) {
  try {
    yield put({
      type: "DELETE_ADDRESS_REQUESTING",
    });

    yield put({
      type: "SHOW_LOADING",
    });

    const requestURL = `${process.env.REACT_APP_API_URL}/api/v1/addresses/changeState/${payload.value.idAddress}`;

    const headers = {
      method: "PATCH",
      headers: new Headers({
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(payload.value),
    };

    const response = yield call(request, requestURL, headers);

    yield put({
      type: "HIDE_LOADING",
    });

    yield put({
      type: "SHOW_ALERT",
      value: {
        type: "success",
        title: "Successful disable",
        message: "Successful disable Address",
      },
    });

    yield put({
      type: "DELETE_ADDRESS_SUCCESS",
      value: response,
    });
  } catch (error) {
    yield put({
      type: "HIDE_LOADING",
    });
    yield put({
      type: "SHOW_ALERT",
      value: {
        type: "danger",
        title: "Falied disable",
        message: "Falied disable Address",
      },
    });
    yield put({
      type: "DELETE_ADDRESS_ERROR",
    });
  }
}

function* updateAddress(payload) {
  try {
    yield put({
      type: "UPDATE_ADDRESS_REQUESTING",
    });

    yield put({
      type: "SHOW_LOADING",
    });

    const requestURL = `${process.env.REACT_APP_API_URL}/api/v1/addresses/${payload.value.id}`;

    const headers = {
      method: "PATCH",
      headers: new Headers({
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(payload.value),
    };

    const response = yield call(request, requestURL, headers);

    yield put({
      type: "HIDE_LOADING",
    });

    yield put({
      type: "SHOW_ALERT",
      value: {
        type: "success",
        title: "Successful update",
        message: "Successful update Address",
      },
    });

    yield put({
      type: "UPDATE_ADDRESS_SUCCESS",
      value: response,
    });
  } catch (error) {
    yield put({
      type: "HIDE_LOADING",
    });
    yield put({
      type: "SHOW_ALERT",
      value: {
        type: "danger",
        title: "Falied update",
        message: "Falied update Address",
      },
    });
    yield put({
      type: "UPDATE_ADDRESS_ERROR",
    });
  }
}

function* uploadFileAddress(payload) {
  try {
    yield put({ type: "UPLOAD_ADDRESS_REQUESTING" });
    yield put({
      type: "SHOW_LOADING",
    });

    const requestURL = `${process.env.REACT_APP_API_URL}/api/v1/addresses/upload`;

    const formData = new FormData();
    formData.append("file", payload.value.file);
    formData.append("company", payload.value.company);
    formData.append("city", payload.value.city);

    const headers = {
      method: "POST",
      headers: new Headers({
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      }),
      body: formData,
    };

    const response = yield call(request, requestURL, headers);

    yield put({
      type: "UPLOAD_ADDRESS_SUCCESS",
      value: response,
    });

    yield put({
      type: "HIDE_LOADING",
    });

    yield put({
      type: "SHOW_ALERT",
      value: {
        type: "success",
        title: "Successful upload",
        message: "Successful upload file",
      },
    });
  } catch (error) {
    yield put({
      type: "HIDE_LOADING",
    });
    yield put({
      type: "SHOW_ALERT",
      value: {
        type: "danger",
        title: "Falied load",
        message: "Falied upload file",
      },
    });
    yield put({
      type: "UPLOAD_ADDRESS_ERROR",
    });
  }
}

function* getAllAddressesAvailable(payload) {
  try {
    yield put({
      type: "FETCH_AVAILABLE_ADDRESSES_REQUESTING",
    });

    yield put({
      type: "SHOW_LOADING",
    });

    let requestURL = `${process.env.REACT_APP_API_URL}/api/v1/addresses/available?page=${payload.value.page}&search=${payload.value.search}&offset=${payload.value.offset}`;
    if (payload.value.idCity) {
      requestURL = requestURL + `&idCity=${payload.value.idCity}`;
    }
    if (payload.value.idZone) {
      requestURL = requestURL + `&idZone=${payload.value.idZone}`;
    }
    if (payload.value.state && payload.value.state != '') {
      requestURL = requestURL + `&state=${payload.value.state}`;
    }
    const headers = {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      }),
    };
    const response = yield call(request, requestURL, headers);

    yield put({
      type: "HIDE_LOADING",
    });

    yield put({
      type: "FETCH_AVAILABLE_ADDRESS_SUCCESS",
      value: response,
    });
  } catch (error) {
    yield put({
      type: "HIDE_LOADING",
    });
    yield put({
      type: "SHOW_ALERT",
      value: {
        type: "danger",
        title: "Falied load",
        message: "Falied load Addresses Available",
      },
    });
    yield put({
      type: "FETCH_AVAILABLE_ADDRESS_ERROR",
    });
  }
}

export function* watchAddress() {
  yield takeLatest("FETCH_ADDRESSES_REQUEST", getAllAddresses);
  yield takeLatest("CREATE_ADDRESS_REQUEST", postAddress);
  yield takeLatest("READ_ADDRESS_REQUEST", getAddressById);
  yield takeLatest("READBYCITY_ADDRESS_REQUEST", getAddressByIdCity);
  yield takeLatest("READBYZONE_ADDRESS_REQUEST", getAddressByIdZone);
  yield takeLatest("DELETE_ADDRESS_REQUEST", deleteAddressById);
  yield takeLatest("UPDATE_ADDRESS_REQUEST", updateAddress);
  yield takeLatest("UPLOAD_ADDRESS_REQUEST", uploadFileAddress);
  yield takeLatest(
    "FETCH_AVAILABLE_ADDRESSES_REQUEST",
    getAllAddressesAvailable
  );
}

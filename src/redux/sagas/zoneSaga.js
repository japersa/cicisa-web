import { call, put, takeLatest } from "redux-saga/effects";
import request from "../../utils/request";

function* getAllZones(payload) {
  try {
    yield put({
      type: "FETCH_ZONES_REQUESTING",
    });

    yield put({
      type: "SHOW_LOADING",
    });

    const requestURL = `${process.env.REACT_APP_API_URL}/api/v1/zones?page=${payload.value.page}&search=${payload.value.search}&offset=${payload.value.offset}`;
    const headers = {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      }),
    };
    const response = yield call(request, requestURL, headers);

    yield put({
      type: "FETCH_ZONE_SUCCESS",
      value: response,
    });
    yield put({
      type: "HIDE_LOADING",
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
        message: "Falied load Zones",
      },
    });
    yield put({
      type: "FETCH_ZONE_ERROR",
    });
  }
}

function* postZone(payload) {
  try {
    yield put({ type: "CREATE_ZONE_REQUESTING" });

    yield put({
      type: "SHOW_LOADING",
    });

    const requestURL = `${process.env.REACT_APP_API_URL}/api/v1/zones`;

    const headers = {
      method: "POST",
      headers: new Headers({
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(payload.value),
    };

    const response = yield call(request, requestURL, headers);

    yield put({
      type: "CREATE_ZONE_SUCCESS",
      value: response,
    });
    yield put({
      type: "HIDE_LOADING",
    });
    yield put({
      type: "SHOW_ALERT",
      value: {
        type: "success",
        title: "Successful save",
        message: "Successful save Zone",
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
        title: "Falied save",
        message: "Falied save Zone",
      },
    });
    yield put({
      type: "CREATE_ZONE_ERROR",
    });
  }
}

function* getZoneById(payload) {
  try {
    yield put({
      type: "READ_ZONE_REQUESTING",
    });

    yield put({
      type: "SHOW_LOADING",
    });

    const requestURL = `${process.env.REACT_APP_API_URL}/api/v1/zones/${payload.value.id}`;

    const headers = {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      }),
    };
    const response = yield call(request, requestURL, headers);

    yield put({
      type: "READ_ZONE_SUCCESS",
      value: response,
    });
    yield put({
      type: "HIDE_LOADING",
    });
  } catch (error) {
    yield put({
      type: "HIDE_LOADING",
    });
    yield put({
      type: "READ_ZONE_ERROR",
    });
  }
}

function* deleteZoneById(payload) {
  try {
    yield put({
      type: "DELETE_ZONE_REQUESTING",
    });

    yield put({
      type: "SHOW_LOADING",
    });

    const requestURL = `${process.env.REACT_APP_API_URL}/api/v1/zones/changeState/${payload.value.idZone}`;

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
      type: "DELETE_ZONE_SUCCESS",
      value: response,
    });
    yield put({
      type: "HIDE_LOADING",
    });
    yield put({
      type: "SHOW_ALERT",
      value: {
        type: "success",
        title: "Successful disable",
        message: "Successful disable Zone",
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
        title: "Falied disable",
        message: "Falied disable Zone",
      },
    });
    yield put({
      type: "DELETE_ZONE_ERROR",
    });
  }
}

function* updateZone(payload) {
  try {
    yield put({
      type: "UPDATE_ZONE_REQUESTING",
    });

    yield put({
      type: "SHOW_LOADING",
    });

    const requestURL = `${process.env.REACT_APP_API_URL}/api/v1/zones/${payload.value.id}`;

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
      type: "UPDATE_ZONE_SUCCESS",
      value: response,
    });
    yield put({
      type: "HIDE_LOADING",
    });
    yield put({
      type: "SHOW_ALERT",
      value: {
        type: "success",
        title: "Successful update",
        message: "Successful update Zone",
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
        title: "Falied update",
        message: "Falied update Zone",
      },
    });
    yield put({
      type: "UPDATE_ZONE_ERROR",
    });
  }
}

function* uploadFileZone(payload) {
  try {
    yield put({ type: "UPLOAD_ZONE_REQUESTING" });
    yield put({
      type: "SHOW_LOADING",
    });

    const requestURL = `${process.env.REACT_APP_API_URL}/api/v1/zones/upload`;

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

    yield put({
      type: "UPLOAD_ZONE_SUCCESS",
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
        message: "Falied upload file",
      },
    });
    yield put({
      type: "UPLOAD_ZONE_ERROR",
    });
  }
}

function* getAllZonesByIdCity(payload) {
  try {
    yield put({
      type: "READBYCITY_ZONE_REQUESTING",
    });

    yield put({
      type: "SHOW_LOADING",
    });

    const requestURL = `${process.env.REACT_APP_API_URL}/api/v1/zones/city/${payload.value.idCity}`;

    const headers = {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      }),
    };
    const response = yield call(request, requestURL, headers);

    yield put({
      type: "READBYCITY_ZONE_SUCCESS",
      value: response,
    });
    yield put({
      type: "HIDE_LOADING",
    });
  } catch (error) {
    yield put({
      type: "HIDE_LOADING",
    });
    yield put({
      type: "READBYCITY_ZONE_ERROR",
    });
  }
}

export function* watchZone() {
  yield takeLatest("FETCH_ZONES_REQUEST", getAllZones);
  yield takeLatest("CREATE_ZONE_REQUEST", postZone);
  yield takeLatest("READ_ZONE_REQUEST", getZoneById);
  yield takeLatest("DELETE_ZONE_REQUEST", deleteZoneById);
  yield takeLatest("UPDATE_ZONE_REQUEST", updateZone);
  yield takeLatest("UPLOAD_ZONE_REQUEST", uploadFileZone);
  yield takeLatest("FETCHBYCITY_ZONE_REQUEST", getAllZonesByIdCity);
}

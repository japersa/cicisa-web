import { call, put, takeLatest } from "redux-saga/effects";
import request from "../../utils/request";

function* getAllZoneNeighborhoods(payload) {
  try {
    yield put({
      type: "FETCH_ZONENEIGHBORHOODS_REQUESTING",
    });

    yield put({
      type: "SHOW_LOADING",
    });

    const requestURL = `${process.env.REACT_APP_API_URL}/api/v1/zonesNeighborhoods?page=${payload.value.page}&search=${payload.value.search}&offset=${payload.value.offset}`;
    const headers = {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      }),
    };
    const response = yield call(request, requestURL, headers);

    yield put({
      type: "FETCH_ZONENEIGHBORHOOD_SUCCESS",
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
        message: "Falied load Zone Neighborhoods",
      },
    });
    yield put({
      type: "FETCH_ZONENEIGHBORHOOD_ERROR",
    });
  }
}

function* postZoneNeighborhood(payload) {
  try {
    yield put({ type: "CREATE_ZONENEIGHBORHOOD_REQUESTING" });

    yield put({
      type: "SHOW_LOADING",
    });

    const requestURL = `${process.env.REACT_APP_API_URL}/api/v1/zonesNeighborhoods`;

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
      type: "CREATE_ZONENEIGHBORHOOD_SUCCESS",
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
        message: "Successful save Zone neighborhood",
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
        message: "Falied save Zone neighborhood",
      },
    });
    yield put({
      type: "CREATE_ZONENEIGHBORHOOD_ERROR",
    });
  }
}

function* getZoneNeighborhoodById(payload) {
  try {
    yield put({
      type: "READ_ZONENEIGHBORHOOD_REQUESTING",
    });

    yield put({
      type: "SHOW_LOADING",
    });

    const requestURL = `${process.env.REACT_APP_API_URL}/api/v1/zonesNeighborhoods/${payload.value.id}`;

    const headers = {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      }),
    };
    const response = yield call(request, requestURL, headers);

    yield put({
      type: "READ_ZONENEIGHBORHOOD_SUCCESS",
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
      type: "READ_ZONENEIGHBORHOOD_ERROR",
    });
  }
}

function* deleteZoneNeighborhoodById(payload) {
  try {
    yield put({
      type: "DELETE_ZONENEIGHBORHOOD_REQUESTING",
    });

    yield put({
      type: "SHOW_LOADING",
    });

    const requestURL = `${process.env.REACT_APP_API_URL}/api/v1/zonesNeighborhoods/changeState/${payload.value.idZoneNeighborhood}`;

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
      type: "DELETE_ZONENEIGHBORHOOD_SUCCESS",
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
        message: "Successful disable Zone neighborhood",
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
        message: "Falied disable Zone neighborhood",
      },
    });
    yield put({
      type: "DELETE_ZONENEIGHBORHOOD_ERROR",
    });
  }
}

function* updateZoneNeighborhood(payload) {
  try {
    yield put({
      type: "UPDATE_ZONENEIGHBORHOOD_REQUESTING",
    });

    yield put({
      type: "SHOW_LOADING",
    });

    const requestURL = `${process.env.REACT_APP_API_URL}/api/v1/zonesNeighborhoods/${payload.value.id}`;

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
      type: "UPDATE_ZONENEIGHBORHOOD_SUCCESS",
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
        message: "Successful update Zone neighborhood",
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
        message: "Falied update Zone neighborhood",
      },
    });
    yield put({
      type: "UPDATE_ZONENEIGHBORHOOD_ERROR",
    });
  }
}

function* getZoneNeighborhoodsByNeighborhoodId(payload) {
  try {
    yield put({
      type: "READBYNEIGHBORHOOD_ZONENEIGHBORHOOD_REQUESTING",
    });

    yield put({
      type: "SHOW_LOADING",
    });
    
    const requestURL = `${process.env.REACT_APP_API_URL}/api/v1/zonesNeighborhoods/neighborhoods/${payload.value.idNeighborhood}`;

    const headers = {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      }),
    };
    const response = yield call(request, requestURL, headers);

    yield put({
      type: "READBYNEIGHBORHOOD_ZONENEIGHBORHOOD_SUCCESS",
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
      type: "READBYNEIGHBORHOOD_ZONENEIGHBORHOOD_ERROR",
    });
  }
}

export function* watchZoneNeighborhood() {
  yield takeLatest("FETCH_ZONENEIGHBORHOODS_REQUEST", getAllZoneNeighborhoods);
  yield takeLatest("CREATE_ZONENEIGHBORHOOD_REQUEST", postZoneNeighborhood);
  yield takeLatest("READ_ZONENEIGHBORHOOD_REQUEST", getZoneNeighborhoodById);
  yield takeLatest(
    "DELETE_ZONENEIGHBORHOOD_REQUEST",
    deleteZoneNeighborhoodById
  );
  yield takeLatest("UPDATE_ZONENEIGHBORHOOD_REQUEST", updateZoneNeighborhood);
  yield takeLatest("READBYNEIGHBORHOOD_ZONENEIGHBORHOOD_REQUEST", getZoneNeighborhoodsByNeighborhoodId);
}

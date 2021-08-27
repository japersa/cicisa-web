import { call, put, takeLatest } from "redux-saga/effects";
import request from "../../utils/request";

function* getAllHeadquartersses(payload) {
  try {
    yield put({
      type: "FETCH_HEADQUARTERSSES_REQUESTING",
    });

    yield put({
      type: "SHOW_LOADING",
    });

    const requestURL = `${process.env.REACT_APP_API_URL}/api/v1/headquartersses?page=${payload.value.page}&search=${payload.value.search}&offset=${payload.value.offset}`;
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
      type: "FETCH_HEADQUARTERS_SUCCESS",
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
        message: "Falied load Headquartersses",
      },
    });
    yield put({
      type: "FETCH_HEADQUARTERS_ERROR",
    });
  }
}

function* postHeadquarters(payload) {
  try {
    yield put({ type: "CREATE_HEADQUARTERS_REQUESTING" });
    yield put({
      type: "SHOW_LOADING",
    });
    const requestURL = `${process.env.REACT_APP_API_URL}/api/v1/headquartersses`;

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
      type: "HIDE_LOADING",
    });

    yield put({
      type: "SHOW_ALERT",
      value: {
        type: "success",
        title: "Successful save",
        message: "Successful save Headquarters",
      },
    });

    yield put({
      type: "CREATE_HEADQUARTERS_SUCCESS",
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
        title: "Falied save",
        message: "Falied save Headquarters",
      },
    });
    yield put({
      type: "CREATE_HEADQUARTERS_ERROR",
    });
  }
}

function* getHeadquartersById(payload) {
  try {
    yield put({
      type: "READ_HEADQUARTERS_REQUESTING",
    });
    yield put({
      type: "SHOW_LOADING",
    });
    const requestURL = `${process.env.REACT_APP_API_URL}/api/v1/headquartersses/${payload.value.id}`;

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
      type: "READ_HEADQUARTERS_SUCCESS",
      value: response,
    });
  } catch (error) {
    yield put({
      type: "HIDE_LOADING",
    });
    yield put({
      type: "READ_HEADQUARTERS_ERROR",
    });
  }
}

function* deleteHeadquartersById(payload) {
  try {
    yield put({
      type: "DELETE_HEADQUARTERS_REQUESTING",
    });
    yield put({
      type: "SHOW_LOADING",
    });
    const requestURL = `${process.env.REACT_APP_API_URL}/api/v1/headquartersses/changeState/${payload.value.idHeadquarters}`;

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
        message: "Successful disable Headquarters",
      },
    });

    yield put({
      type: "DELETE_HEADQUARTERS_SUCCESS",
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
        message: "Falied disable Headquarters",
      },
    });
    yield put({
      type: "DELETE_HEADQUARTERS_ERROR",
    });
  }
}

function* updateHeadquarters(payload) {
  try {
    yield put({
      type: "UPDATE_HEADQUARTERS_REQUESTING",
    });

    yield put({
      type: "SHOW_LOADING",
    });

    const requestURL = `${process.env.REACT_APP_API_URL}/api/v1/headquartersses/${payload.value.id}`;

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
        message: "Successful update Headquarters",
      },
    });

    yield put({
      type: "UPDATE_HEADQUARTERS_SUCCESS",
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
        message: "Falied update Headquarters",
      },
    });
    yield put({
      type: "UPDATE_HEADQUARTERS_ERROR",
    });
  }
}

export function* watchHeadquarters() {
  yield takeLatest("FETCH_HEADQUARTERSSES_REQUEST", getAllHeadquartersses);
  yield takeLatest("CREATE_HEADQUARTERS_REQUEST", postHeadquarters);
  yield takeLatest("READ_HEADQUARTERS_REQUEST", getHeadquartersById);
  yield takeLatest("DELETE_HEADQUARTERS_REQUEST", deleteHeadquartersById);
  yield takeLatest("UPDATE_HEADQUARTERS_REQUEST", updateHeadquarters);
}

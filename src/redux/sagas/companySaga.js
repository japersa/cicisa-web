import { call, put, takeLatest } from "redux-saga/effects";
import request from "../../utils/request";

function* getAllCompanies(payload) {
  try {
    yield put({
      type: "FETCH_COMPANIES_REQUESTING",
    });

    yield put({
      type: "SHOW_LOADING",
    });

    const requestURL = `${process.env.REACT_APP_API_URL}/api/v1/companies?page=${payload.value.page}&search=${payload.value.search}&offset=${payload.value.offset}`;
    const headers = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    const response = yield call(request, requestURL, headers);

    yield put({
      type: "FETCH_COMPANY_SUCCESS",
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
        message: "Falied load Companies",
      },
    });
    yield put({
      type: "FETCH_COMPANY_ERROR",
    });
  }
}

function* postCompany(payload) {
  try {
    yield put({ type: "CREATE_COMPANY_REQUESTING" });

    yield put({
      type: "SHOW_LOADING",
    });
    const requestURL = `${process.env.REACT_APP_API_URL}/api/v1/companies`;

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
      type: "CREATE_COMPANY_SUCCESS",
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
        message: "Successful save Company",
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
        message: "Falied save Company",
      },
    });
    yield put({
      type: "CREATE_COMPANY_ERROR",
    });
  }
}

function* getCompanyById(payload) {
  try {
    yield put({
      type: "READ_COMPANY_REQUESTING",
    });

    yield put({
      type: "SHOW_LOADING",
    });

    const requestURL = `${process.env.REACT_APP_API_URL}/api/v1/companies/${payload.value.id}`;

    const headers = {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      }),
    };
    const response = yield call(request, requestURL, headers);

    yield put({
      type: "READ_COMPANY_SUCCESS",
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
      type: "READ_COMPANY_ERROR",
    });
  }
}

function* deleteCompanyById(payload) {
  try {
    yield put({
      type: "DELETE_COMPANY_REQUESTING",
    });

    yield put({
      type: "SHOW_LOADING",
    });

    const requestURL = `${process.env.REACT_APP_API_URL}/api/v1/companies/changeState/${payload.value.idCompany}`;

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
      type: "DELETE_COMPANY_SUCCESS",
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
        message: "Successful disable Company",
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
        message: "Falied disable Company",
      },
    });
    yield put({
      type: "DELETE_COMPANY_ERROR",
    });
  }
}

function* updateCompany(payload) {
  try {
    yield put({
      type: "UPDATE_COMPANY_REQUESTING",
    });

    yield put({
      type: "SHOW_LOADING",
    });

    const requestURL = `${process.env.REACT_APP_API_URL}/api/v1/companies/${payload.value.id}`;

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
      type: "UPDATE_COMPANY_SUCCESS",
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
        message: "Successful update Company",
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
        message: "Falied update Company",
      },
    });
    yield put({
      type: "UPDATE_COMPANY_ERROR",
    });
  }
}

function* getCompanyByUser(payload) {
  try {
    yield put({
      type: "READBYUSER_COMPANY_REQUESTING",
    });

    yield put({
      type: "SHOW_LOADING",
    });

    const requestURL = `${process.env.REACT_APP_API_URL}/api/v1/companies/getByUser`;

    const headers = {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      }),
    };
    const response = yield call(request, requestURL, headers);

    yield put({
      type: "READBYUSER_COMPANY_SUCCESS",
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
      type: "READBYUSER_COMPANY_ERROR",
    });
  }
}

export function* watchCompany() {
  yield takeLatest("FETCH_COMPANIES_REQUEST", getAllCompanies);
  yield takeLatest("CREATE_COMPANY_REQUEST", postCompany);
  yield takeLatest("READ_COMPANY_REQUEST", getCompanyById);
  yield takeLatest("DELETE_COMPANY_REQUEST", deleteCompanyById);
  yield takeLatest("UPDATE_COMPANY_REQUEST", updateCompany);
  yield takeLatest("READBYUSER_COMPANY_REQUEST", getCompanyByUser);
}

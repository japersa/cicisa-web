import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import Sidebar from "../../components/Navigation/Sidebar";
import Topbar from "../../components/Navigation/Topbar";
import Grid from "../../components/Grid";
import { connect } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { Show } from "../../hooks/Show";

const Company = ({
  reduxGetCompanies,
  companies,
  reduxPostCompany,
  company,
  reduxGetCompany,
  rowEdited,
  reduxDeleteCompany,
  rowDeleted,
  reduxPatchCompany,
  rowUpdated,
  reduxResetCompanyForm,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const [offset, setOffset] = useState(10);

  const [show, setShow] = useState(false);

  const handleClose = () => {
    reduxResetCompanyForm();
    setShow(false);
  };
  const handleShow = () => {
    reduxResetCompanyForm();
    reset();
    setShow(true);
  };
  const [search, setSearch] = useState("");

  const columns = [
    {
      title: "#",
      render: (rowData) => {
        return <span>{rowData.idCompany}</span>;
      },
    },
    {
      title: "Descripción",
      render: (rowData) => {
        return <span>{rowData.description}</span>;
      },
    },
    {
      title: "Latitud",
      render: (rowData) => {
        return <span>{rowData.lat}</span>;
      },
    },
    {
      title: "Longitud",
      render: (rowData) => {
        return <span>{rowData.lon}</span>;
      },
    },
    {
      title: "Opciones",
      render: (rowData) => {
        return (
          <>
            {rowData.isActive ? (
              <>
                <Show when="feature:edit-company">
                  <button
                    title="Editar"
                    className="btn btn-primary btn-sm  btn-circle mr-2"
                    type="button"
                    onClick={(e) => handleOpen(rowData)}
                  >
                    <i className="fas fa-edit fa-xs"></i>
                  </button>
                </Show>
                <Show when="feature:disabled-company">
                  <button
                    title="Desactivar"
                    className="btn btn-danger btn-sm btn-circle"
                    type="button"
                    onClick={(e) => handleDelete(rowData)}
                  >
                    <i className="fas fa-times-circle fa-xs"></i>
                  </button>
                </Show>
              </>
            ) : (
              <Show when="feature:enabled-company">
                <button
                  title="Activar"
                  className="btn btn-primary btn-sm  btn-circle mr-2"
                  type="button"
                  onClick={(e) => handleActive(rowData)}
                >
                  <i className="fas fa-check-circle fa-xs"></i>
                </button>
              </Show>
            )}
          </>
        );
      },
    },
  ];

  const handleOpen = (row) => {
    reduxGetCompany({
      id: row.idCompany,
    });
  };

  const handleActive = (row) => {
    if (!row.isActive) {
      reduxDeleteCompany(row);
    }
  };

  useEffect(() => {
    if (rowEdited) {
      setShow(true);
      setValue("description", rowEdited.description);
      setValue("lat", rowEdited.lat);
      setValue("lon", rowEdited.lon);
      setValue("gcp_pwd", rowEdited.gcp_pwd);
    }
  }, [rowEdited]);

  const handleDelete = (row) => {
    reduxDeleteCompany(row);
  };

  useEffect(() => {
    reduxGetCompanies({
      page: 1,
      offset: offset,
      search: "",
    });
  }, []);

  useEffect(() => {
    reduxGetCompanies({
      page: currentPage,
      offset: offset,
      search: search,
    });
  }, [currentPage]);

  const onSubmit = (data) => {
    if (rowEdited) {
      reduxPatchCompany({ ...data, id: rowEdited.idCompany });
    } else {
      reduxPostCompany(data);
    }
    reset();
    reduxResetCompanyForm();
    setShow(false);
  };

  useEffect(() => {
    if (company || rowUpdated || rowDeleted) {
      reduxGetCompanies({
        page: currentPage,
        offset: offset,
        search: search,
      });
      reduxResetCompanyForm();
    }
  }, [company, rowUpdated, rowDeleted]);

  return (
    <div>
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Topbar />
            <div className="container-fluid">
              <div className="d-sm-flex align-items-center mb-1">
                <h1 className="h3 mb-0 text-gray-800 mr-3">Empresas</h1>
                <Show when="feature:create-company">
                  <button
                    className="btn btn-primary btn-circle"
                    type="button"
                    onClick={handleShow}
                  >
                    <i className="fas fa-plus fa-sm"></i>
                  </button>
                </Show>
              </div>
              <p className="mb-4">Módulo de Administración de empresas</p>
              <div className="card shadow mb-4">
                <div className="card-header py-3">
                  <h6 className="m-0 font-weight-bold text-primary">
                    Listado de Empresas
                  </h6>
                </div>
                <div className="card-body">
                  <Grid
                    cols={columns}
                    data={
                      companies && Object.keys(companies).length > 0
                        ? companies.items
                        : []
                    }
                    page={
                      companies && Object.keys(companies).length > 0
                        ? Number(companies.page)
                        : currentPage
                    }
                    pages={
                      companies && Object.keys(companies).length > 0
                        ? Number(companies.totalPages)
                        : 1
                    }
                    onChangePage={(page) => setCurrentPage(page)}
                    onChangeRange={(value) => {
                      reduxGetCompanies({
                        page: 1,
                        offset: value,
                        search: search,
                      });
                    }}
                    defaultValue={search}
                    onChangeSearch={(value) => {
                      setSearch(value);
                      reduxGetCompanies({
                        page: 1,
                        offset: offset,
                        search: value,
                      });
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Modal.Header closeButton>
              <Modal.Title>
                {rowEdited ? "Editar" : "Nuevo"} Company
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="form-group">
                <label htmlFor="description" className="form-label">
                  Descripción
                </label>
                <input
                  id="description"
                  type="text"
                  className={`form-control form-control-user ${
                    errors.description && "is-invalid"
                  }`}
                  {...register("description", { required: true })}
                />
                {errors.description && (
                  <span className="invalid-feedback">
                    La descripción es requerida
                  </span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="lat" className="form-label">
                  Latitud
                </label>
                <input
                  id="lat"
                  type="text"
                  className={`form-control form-control-user ${
                    errors.lat && "is-invalid"
                  }`}
                  {...register("lat", { required: true })}
                />
                {errors.lat && (
                  <span className="invalid-feedback">
                    La latitud es requerida
                  </span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="lon" className="form-label">
                  Longitud
                </label>
                <input
                  id="lon"
                  type="text"
                  className={`form-control form-control-user ${
                    errors.lon && "is-invalid"
                  }`}
                  {...register("lon", { required: true })}
                />
                {errors.lon && (
                  <span className="invalid-feedback">
                    La longitud es requerida
                  </span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="gcp_pwd" className="form-label">
                  Clave
                </label>
                <input
                  id="gcp_pwd"
                  type="text"
                  className={`form-control form-control-user ${
                    errors.gcp_pwd && "is-invalid"
                  }`}
                  {...register("gcp_pwd", { required: true })}
                />
                {errors.gcp_pwd && (
                  <span className="invalid-feedback">
                    La clave es requerida
                  </span>
                )}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancelar
              </Button>
              <Button variant="primary" type="submit">
                Guardar
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    companies: state.companyState.companies,
    company: state.companyState.company,
    rowEdited: state.companyState.rowEdited,
    rowDeleted: state.companyState.rowDeleted,
    rowUpdated: state.companyState.rowUpdated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    reduxGetCompanies: (payload) =>
      dispatch({
        type: "FETCH_COMPANIES_REQUEST",
        value: payload,
      }),
    reduxPostCompany: (payload) =>
      dispatch({
        type: "CREATE_COMPANY_REQUEST",
        value: payload,
      }),
    reduxGetCompany: (payload) =>
      dispatch({
        type: "READ_COMPANY_REQUEST",
        value: payload,
      }),
    reduxDeleteCompany: (payload) =>
      dispatch({
        type: "DELETE_COMPANY_REQUEST",
        value: payload,
      }),
    reduxPatchCompany: (payload) =>
      dispatch({
        type: "UPDATE_COMPANY_REQUEST",
        value: payload,
      }),
    reduxResetCompanyForm: () =>
      dispatch({
        type: "RESET_COMPANY_FORM",
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Company);

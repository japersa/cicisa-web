import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import Sidebar from "../../components/Navigation/Sidebar";
import Topbar from "../../components/Navigation/Topbar";
import Grid from "../../components/Grid";
import { connect } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { Show } from "../../hooks/Show";
import { useAuth } from "../../hooks/useAuth";
import Timeline from "../../components/Timeline";
const Swal = require("sweetalert2");

const Address = ({
  reduxGetCompanies,
  companies,
  reduxGetAddresses,
  addresses,
  reduxGetAddress,
  address,
  reduxPostAddress,
  rowEdited,
  reduxDeleteAddress,
  rowDeleted,
  reduxPatchAddress,
  rowUpdated,
  reduxResetAddressForm,
  reduxUploadFile,
  fileUploaded,
  reduxGetCities,
  cities,
  reduxGetNeighborhoodsByCity,
  neighborhoodsByCity,
  reduxGetDepartmentsByCountry,
  departmentsByCountry,
  reduxGetCitiesByDepartment,
  citiesByDepartment,
  countries,
  reduxGetCountries,
  reduxSetDepartment,
  reduxSetCity,
  reduxSetNeighborhood,
  reduxGetZoneNeighborhoods,
  zoneNeighborhoods,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      indicativeRoad: "",
      roadNumber: "",
      appendixRoad: "",
      crossoverRoad: "",
      crossoverNumber: "",
      appendixCrossingNumber: "",
      orientationCrossingNumber: "",
      insideTypes: "",
      doorNumber: "",
      inside: "",
      city: "",
      neighborhood: "",
      country: "",
      department: "",
    },
  });
  const {
    register: registerUpload,
    handleSubmit: handleSubmitUpload,
    watch: watchUpload,
    formState: { errors: errorsUpload },
    reset: resetUpload,
    setValue: setValueUpload,
    getValues: getValuesUpload,
  } = useForm({});
  const [currentPage, setCurrentPage] = useState(1);
  const [offset, setOffset] = useState(10);
  const [show, setShow] = useState(false);
  const [cityFound, setCityFound] = useState("");
  const [showUpload, setShowUpload] = useState(false);
  const [showDownload, setShowDownload] = useState(false);
  const [countryFound, setCountryFound] = useState("");
  const [departmentFound, setDepartmentFound] = useState("");
  const [neighborhoodFound, setNeighborhoodFound] = useState("");
  const [fileName, setFileName] = useState(null);
  const [fileError, setFileError] = useState(null);
  const { session } = useAuth();

  const [showTimeline, setShowTimeline] = useState(false);
  const [idAddressSelected, setIdAddressSelected] = useState(null);

  const handleOpenTimeline = (id) => {
    setIdAddressSelected(id);
    setShowTimeline(true);
  }

  const handleCloseTimeline = () => {
    setIdAddressSelected(null);
    setShowTimeline(false);
  }

  const ADDRESSROADTYPES = [
    { id: "ANV", name: "ANILLO VIAL", code: "ANV" },
    { id: "AUT", name: "AUTOPISTA", code: "AUT" },
    { id: "AV", name: "AVENIDA", code: "AV" },
    { id: "BLV", name: "BULEVAR", code: "BLV" },
    { id: "CL", name: "CALLE", code: "CL" },
    { id: "CLJ", name: "CALLEJÓN", code: "CLJ" },
    { id: "CR", name: "CARRERA", code: "CR" },
    { id: "CRT", name: "CARRETERA", code: "CRT" },
    { id: "CIR", name: "CIRCULAR", code: "CIR" },
    { id: "CRV", name: "CIRCUNVALAR", code: "CRV" },
    { id: "CRG", name: "CORREGIMIENTO", code: "CRG" },
    { id: "DG", name: "DIAGONAL", code: "DG" },
    { id: "TV", name: "TRANSVERSAL", code: "TV" },
    { id: "TC", name: "TRONCAL", code: "TC" },
    { id: "VT", name: "VARIANTE", code: "VT" },
    { id: "VRD", name: "VEREDA", code: "VRD" },
    { id: "VI", name: "VÍA", code: "VI" },
    { id: "KM", name: "KILÓMETRO", code: "KM" },
    { id: "SLD", name: "SALIDA", code: "SLD" },
    { id: "SCT", name: "SECTOR", code: "SCT" },
  ];

  const ADDRESSNOMENCLATURE = [
    { id: "A", name: "A", code: "A" },
    { id: "AA", name: "AA", code: "AA" },
    { id: "AB", name: "AB", code: "AB" },
    { id: "AC", name: "AC", code: "AC" },
    { id: "AD", name: "AD", code: "AD" },
    { id: "AE", name: "AE", code: "AE" },
    { id: "AF", name: "AF", code: "AF" },
    { id: "AG", name: "AG", code: "AG" },
    { id: "AH", name: "AH", code: "AH" },
    { id: "B", name: "B", code: "B" },
    { id: "BA", name: "BA", code: "BA" },
    { id: "BB", name: "BB", code: "BB" },
    { id: "BC", name: "BC", code: "BC" },
    { id: "BD", name: "BD", code: "BD" },
    { id: "BE", name: "BE", code: "BE" },
    { id: "BF", name: "BF", code: "BF" },
    { id: "BG", name: "BG", code: "BG" },
    { id: "BH", name: "BH", code: "BH" },
    { id: "C", name: "C", code: "C" },
    { id: "CA", name: "CA", code: "CA" },
    { id: "CB", name: "CB", code: "CB" },
    { id: "CC", name: "CC", code: "CC" },
    { id: "CD", name: "CD", code: "CD" },
    { id: "CE", name: "CE", code: "CE" },
    { id: "CF", name: "CF", code: "CF" },
    { id: "CG", name: "CG", code: "CG" },
    { id: "CH", name: "CH", code: "CH" },
    { id: "D", name: "D", code: "D" },
    { id: "DA", name: "DA", code: "DA" },
    { id: "DB", name: "DB", code: "DB" },
    { id: "DC", name: "DC", code: "DC" },
    { id: "DD", name: "DD", code: "DD" },
    { id: "DE", name: "DE", code: "DE" },
    { id: "DF", name: "DF", code: "DF" },
    { id: "DG", name: "DG", code: "DG" },
    { id: "DH", name: "DH", code: "DH" },
    { id: "E", name: "E", code: "E" },
    { id: "EA", name: "EA", code: "EA" },
    { id: "EB", name: "EB", code: "EB" },
    { id: "EC", name: "EC", code: "EC" },
    { id: "ED", name: "ED", code: "ED" },
    { id: "EE", name: "EE", code: "EE" },
    { id: "EF", name: "EF", code: "EF" },
    { id: "EG", name: "EG", code: "EG" },
    { id: "EH", name: "EH", code: "EH" },
    { id: "F", name: "F", code: "F" },
    { id: "FA", name: "FA", code: "FA" },
    { id: "FB", name: "FB", code: "FB" },
    { id: "FC", name: "FC", code: "FC" },
    { id: "FD", name: "FD", code: "FD" },
    { id: "FE", name: "FE", code: "FE" },
    { id: "FF", name: "FF", code: "FF" },
    { id: "FG", name: "FG", code: "FG" },
    { id: "FH", name: "FH", code: "FH" },
    { id: "G", name: "G", code: "G" },
    { id: "GA", name: "GA", code: "GA" },
    { id: "GB", name: "GB", code: "GB" },
    { id: "GC", name: "GC", code: "GC" },
    { id: "GD", name: "GD", code: "GD" },
    { id: "GE", name: "GE", code: "GE" },
    { id: "GF", name: "GF", code: "GF" },
    { id: "GG", name: "GG", code: "GG" },
    { id: "GH", name: "GH", code: "GH" },
    { id: "H", name: "H", code: "H" },
    { id: "HA", name: "HA", code: "HA" },
    { id: "HB", name: "HB", code: "HB" },
    { id: "HC", name: "HC", code: "HC" },
    { id: "HD", name: "HD", code: "HD" },
    { id: "HE", name: "HE", code: "HE" },
    { id: "HF", name: "HF", code: "HF" },
    { id: "HG", name: "HG", code: "HG" },
    { id: "HH", name: "HH", code: "HH" },
  ];

  const ADDRESSCARDINALPOINT = [
    { id: "ESTE", name: "ESTE", code: "ESTE" },
    { id: "NORTE", name: "NORTE", code: "NORTE" },
    { id: "OESTE", name: "OESTE", code: "OESTE" },
    { id: "SUR", name: "SUR", code: "SUR" },
  ];

  const INSIDE_TYPES = [
    { id: "APARTAMENTO", name: "APARTAMENTO", code: "APARTAMENTO" },
    { id: "BLOQUE", name: "BLOQUE", code: "BLOQUE" },
    { id: "CASA", name: "CASA", code: "CASA" },
    { id: "CIUDADELA", name: "CIUDADELA", code: "CIUDADELA" },
    { id: "CONJUNTO", name: "CONJUNTO", code: "CONJUNTO" },
    {
      id: "CONJUNTO RESIDENCIAL",
      name: "CONJUNTO RESIDENCIAL",
      code: "CONJUNTO RESIDENCIAL",
    },
    { id: "EDIFICIO", name: "EDIFICIO", code: "EDIFICIO" },
    { id: "ENTRADA", name: "ENTRADA", code: "ENTRADA" },
    { id: "ETAPA", name: "ETAPA", code: "ETAPA" },
    { id: "INTERIOR", name: "INTERIOR", code: "INTERIOR" },
    { id: "MANZANA", name: "MANZANA", code: "MANZANA" },
    { id: "NORTE", name: "NORTE", code: "NORTE" },
    { id: "OCCIDENTE", name: "OCCIDENTE", code: "OCCIDENTE" },
    { id: "ORIENTE", name: "ORIENTE", code: "ORIENTE" },
    { id: "PENTHOUSE", name: "PENTHOUSE", code: "PENTHOUSE" },
    { id: "PISO", name: "PISO", code: "PISO" },
    { id: "PORTERIA", name: "PORTERIA", code: "PORTERIA" },
    { id: "SOTANO", name: "SOTANO", code: "SOTANO" },
    { id: "SUR", name: "SUR", code: "SUR" },
    { id: "TORRE", name: "TORRE", code: "TORRE" },
  ];

  const indicativeRoad = useRef({});
  indicativeRoad.current = watch("indicativeRoad", "");

  const roadNumber = useRef({});
  roadNumber.current = watch("roadNumber", "");

  const appendixRoad = useRef({});
  appendixRoad.current = watch("appendixRoad", "");

  const crossoverRoad = useRef({});
  crossoverRoad.current = watch("crossoverRoad", "");

  const crossoverNumber = useRef({});
  crossoverNumber.current = watch("crossoverNumber", "");

  const appendixCrossingNumber = useRef({});
  appendixCrossingNumber.current = watch("appendixCrossingNumber", "");

  const orientationCrossingNumber = useRef({});
  orientationCrossingNumber.current = watch("orientationCrossingNumber", "");

  const insideTypes = useRef({});
  insideTypes.current = watch("insideTypes", "");

  const doorNumber = useRef({});
  doorNumber.current = watch("doorNumber", "");

  const inside = useRef({});
  inside.current = watch("inside", "");

  const city = useRef({});
  city.current = watch("city", "");

  const neighborhood = useRef({});
  neighborhood.current = watch("idNeighborhood", "");

  const country = useRef({});
  country.current = watch("country", "");

  const department = useRef({});
  department.current = watch("department", "");

  const file = useRef({});
  file.current = watchUpload("file", "");

  useEffect(() => {
    if (file.current != null && file.current.length > 0) {
      setFileName(file.current[0].name);
    }
  }, [file.current]);

  const handleClose = () => {
    reduxResetAddressForm();
    setShow(false);
  };

  const handleCloseUpload = () => {
    reduxResetAddressForm();
    setFileError(null);
    setShowUpload(false);
  };

  const handleShow = () => {
    reduxGetCompanies({
      page: 1,
      search: "",
      offset: 1000,
    });
    reduxGetCities({
      page: 1,
      offset: 1000,
      search: "",
    });
    reduxGetCountries({
      page: 1,
      offset: 1000,
      search: "",
    });
    reduxResetAddressForm();
    reset();
    setShow(true);
  };
  const [search, setSearch] = useState("");

  const handleShowUpload = () => {
    reduxGetCompanies({
      page: 1,
      search: "",
      offset: 1000,
    });
    reduxGetCities({
      page: 1,
      offset: 1000,
      search: "",
    });
    setShowUpload(true);
  };

  const handleShowDownload = () => {
    const token = window.localStorage.getItem("token");

    var mapForm = window.document.createElement("form");
    mapForm.target = "_self" || "_blank";
    mapForm.id = "stmtForm";
    mapForm.method = "POST";
    mapForm.action = `${process.env.REACT_APP_API_URL}/api/v1/addresses/download`;

    var mapInput = window.document.createElement("input");
    mapInput.type = "hidden";
    mapInput.name = "idCompany";
    mapInput.value = session.role.idCompany;

    mapForm.appendChild(mapInput);
    document.body.appendChild(mapForm);

    mapForm.submit();
  };

  const columns = [
    {
      title: "#",
      render: (rowData) => {
        return <span>{rowData.idAddress}</span>;
      },
    },
    {
      title: "Guía",
      render: (rowData) => {
        return <span>{rowData.guide}</span>;
      },
    },
    {
      title: "Nombre",
      render: (rowData) => {
        return <span>{rowData.name}</span>;
      },
    },
    {
      title: "Dirección",
      render: (rowData) => {
        return <span>{rowData.direction}</span>;
      },
    },
    {
      title: "Referencia 1",
      render: (rowData) => {
        return <span>{rowData.reference1}</span>;
      },
    },
    {
      title: "Referencia 2",
      render: (rowData) => {
        return <span>{rowData.reference2}</span>;
      },
    },
    {
      title: "Valor declarado",
      render: (rowData) => {
        return <span>{rowData.declaredValue}</span>;
      },
    },
    {
      title: "Opciones",
      render: (rowData) => {
        return (
          <>
            {rowData.isActive ? (
              <>
                <Show when="feature:edit-address">
                  <button
                    title="Editar"
                    className="btn btn-primary btn-sm  btn-circle mr-2"
                    type="button"
                    onClick={(e) => handleOpen(rowData)}
                  >
                    <i className="fas fa-edit fa-xs"></i>
                  </button>
                </Show>
                <Show when="feature:disabled-address">
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
              <Show when="feature:enabled-address">
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
    reduxGetCompanies({
      page: 1,
      search: "",
      offset: 1000,
    });
    reduxGetCities({
      page: 1,
      offset: 1000,
      search: "",
    });
    reduxGetCountries({
      page: 1,
      offset: 1000,
      search: "",
    });
    reduxGetAddress({
      id: row.idAddress,
    });
    reset();
  };

  const handleActive = (row) => {
    if (!row.isActive) {
      reduxDeleteAddress(row);
    }
  };

  useEffect(() => {
    if (rowEdited) {
      setShow(true);
      setValue("guide", rowEdited.guide);
      setValue("name", rowEdited.name);
      setValue("currentAddress", rowEdited.direction);
      setValue("reference1", rowEdited.reference1);
      setValue("reference2", rowEdited.reference2);
      setValue("clientGuide", rowEdited.clientGuide);
      setValue("declaredValue", rowEdited.declaredValue);
      setValue("idCompany", rowEdited.idCompany);
    }
  }, [rowEdited]);

  const handleDelete = (row) => {
    reduxDeleteAddress(row);
  };

  useEffect(() => {
    reduxGetAddresses({
      page: 1,
      offset: offset,
      search: "",
    });
    reduxGetZoneNeighborhoods({
      page: 1,
      offset: 100000,
      search: "",
    });
  }, []);

  useEffect(() => {
    reduxGetAddresses({
      page: currentPage,
      offset: offset,
      search: search,
    });
  }, [currentPage]);

  useEffect(() => {
    if (
      country.current != "" &&
      country.current != undefined &&
      country.current != null
    ) {
      setValue("department", "");
      setValue("city", "");
      setValue("neighborhood", "");
      reduxSetDepartment();
      reduxSetCity();
      reduxSetNeighborhood();
      const countrySelected =
        countries &&
        Object.keys(countries).length > 0 &&
        countries.items.find((value) => value.idCountry == country.current);
      setCountryFound(countrySelected ? countrySelected.description : "");
      reduxGetDepartmentsByCountry({
        idCountry: country.current,
      });
    }
  }, [country.current]);

  useEffect(() => {
    if (department.current != "" && department.current != undefined) {
      setValue("city", "");
      setValue("neighborhood", "");
      reduxSetCity();
      reduxSetNeighborhood();
      const departmentSelected =
        departmentsByCountry &&
        Object.keys(departmentsByCountry).length > 0 &&
        departmentsByCountry.find(
          (value) => value.idDepartment == department.current
        );
      setDepartmentFound(
        departmentSelected ? departmentSelected.description : ""
      );
      reduxGetCitiesByDepartment({
        idDepartment: department.current,
      });
    }
  }, [department.current]);

  useEffect(() => {
    if (city.current != "" && city.current != undefined) {
      setValue("neighborhood", "");
      reduxSetNeighborhood();
      const citySelected =
        citiesByDepartment &&
        Object.keys(citiesByDepartment).length > 0 &&
        citiesByDepartment.find((value) => value.idCity == city.current);
      setCityFound(citySelected ? citySelected.description : "");
      reduxGetNeighborhoodsByCity({
        idCity: city.current,
      });
    }
  }, [city.current]);

  useEffect(() => {
    if (neighborhood.current != "" && neighborhood.current != undefined) {
      const neighborhoodSelected =
        neighborhoodsByCity &&
        Object.keys(neighborhoodsByCity).length > 0 &&
        neighborhoodsByCity.find(
          (value) => value.idNeighborhood == neighborhood.current
        );
      setNeighborhoodFound(
        neighborhoodSelected ? neighborhoodSelected.description : ""
      );
    }
  }, [neighborhood.current]);

  const onSubmit = (data) => {
    if (rowEdited) {
      reduxPatchAddress({ ...data, id: rowEdited.idAddress });
    } else {
      if (session && session.role.idCompany) {
        data.idCompany = session.role.idCompany;
      }
      reduxPostAddress(data);
    }
    reset();
    reduxResetAddressForm();
    setShow(false);
  };

  useEffect(() => {
    setValue(
      "direction",
      `${indicativeRoad.current} ${roadNumber.current}${appendixRoad.current} ${crossoverRoad.current
      } ${crossoverNumber.current ? "#" : ""}${crossoverNumber.current}${appendixCrossingNumber.current
      }${orientationCrossingNumber.current ? " " : ""}${orientationCrossingNumber.current
      }${doorNumber.current ? "-" : ""}${doorNumber.current}${insideTypes.current ? " " + insideTypes.current + " " : ""
      }${inside.current}${neighborhood.current ? "," : ""} ${neighborhood.current ? neighborhoodFound : ""
      }${city.current ? ", " + cityFound : ""}${department.current ? ", " + departmentFound : ""
      }${country.current ? ", " + countryFound : ""}`
    );
  }, [
    indicativeRoad.current,
    roadNumber.current,
    appendixRoad.current,
    crossoverRoad.current,
    crossoverNumber.current,
    appendixCrossingNumber.current,
    orientationCrossingNumber.current,
    doorNumber.current,
    insideTypes.current,
    neighborhood.current,
    city.current,
    department.current,
    country.current,
    cityFound,
    departmentFound,
    countryFound,
    neighborhoodFound,
  ]);

  useEffect(() => {
    if (address || rowUpdated || rowDeleted) {
      reduxGetAddresses({
        page: currentPage,
        offset: offset,
        search: search,
      });
      reduxResetAddressForm();
    }
  }, [address, rowUpdated, rowDeleted]);

  const onSubmitUpload = (data) => {
    const file = data.file[0];
    // if (file.current[0].type != "application/vnd.ms-excel") {
    //   setFileError("El archivo debe ser .csv");
    //   return;
    // }
    reduxUploadFile({
      file: file,
      company:
        session && session.role.idCompany
          ? session.role.idCompany
          : data.idCompanyModal,
      city: data.idCityModal ? data.idCityModal : null,
    });
  };

  useEffect(() => {
    if (fileUploaded) {
      setShowUpload(false);
      reduxGetAddresses({
        page: currentPage,
        offset: offset,
        search: search,
      });
      reset();
      reduxResetAddressForm();
      Swal.fire(
        "Proceso exitoso!",
        "Se Cargaron " + fileUploaded.total + " registros",
        "success"
      );
    }
  }, [fileUploaded]);

  return (
    <div>
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Topbar />
            <div className="container-fluid">
              <div className="d-sm-flex align-items-center mb-1">
                <h1 className="h3 mb-0 text-gray-800 mr-3">Direcciones</h1>
                <div>
                  <Show when="feature:create-address">
                    <button
                      className="btn btn-primary btn-circle"
                      type="button"
                      onClick={handleShow}
                    >
                      <i className="fas fa-plus fa-sm"></i>
                    </button>
                  </Show>
                </div>
                <div className="ml-2">
                  <Show when="feature:upload-address">
                    <button
                      className="btn btn-primary btn-circle"
                      type="button"
                      onClick={handleShowUpload}
                    >
                      <i className="fas fa-upload fa-sm"></i>
                    </button>
                  </Show>
                </div>
              </div>
              <p className="mb-4">Módulo de Administración de direcciones</p>
              <div className="card shadow mb-4">
                <div className="card-header py-3">
                  <h6 className="m-0 font-weight-bold text-primary">
                    Listado de Direcciones
                  </h6>
                </div>
                <div className="card-body">
                  <Grid
                    cols={columns}
                    data={
                      addresses && Object.keys(addresses).length > 0
                        ? addresses.items
                        : []
                    }
                    page={
                      addresses && Object.keys(addresses).length > 0
                        ? Number(addresses.page)
                        : currentPage
                    }
                    pages={
                      addresses && Object.keys(addresses).length > 0
                        ? Number(addresses.totalPages)
                        : 1
                    }
                    onChangePage={(page) => setCurrentPage(page)}
                    onChangeRange={(value) => {
                      reduxGetAddresses({
                        page: 1,
                        offset: value,
                        search: search,
                      });
                    }}
                    defaultValue={search}
                    onChangeSearch={(value) => {
                      setSearch(value);
                      reduxGetAddresses({
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
          size="xl"
          show={showTimeline}
          onHide={handleCloseTimeline}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              Timeline
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Timeline idAddress={idAddressSelected}></Timeline>
          </Modal.Body>
        </Modal>
      </div>
      <div>
        <Modal
          size="xl"
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Modal.Header closeButton>
              <Modal.Title>
                {rowEdited ? "Editar" : "Nueva"} Dirección
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row">
                <div className="form-group col-md-3">
                  <label htmlFor="guide" className="form-label">
                    Guía
                  </label>
                  <input
                    id="guide"
                    type="text"
                    className={`form-control form-control-user ${errors.guide && "is-invalid"
                      }`}
                    {...register("guide", { required: true })}
                  />
                  {errors.guide && (
                    <span className="invalid-feedback">
                      La guía es requerida
                    </span>
                  )}
                </div>
                <div className="form-group form-group col-md-3">
                  <label htmlFor="name" className="form-label">
                    Nombre
                  </label>
                  <input
                    id="name"
                    type="text"
                    className={`form-control form-control-user ${errors.name && "is-invalid"
                      }`}
                    {...register("name", { required: true })}
                  />
                  {errors.name && (
                    <span className="invalid-feedback">
                      El nombre es requerido
                    </span>
                  )}
                </div>
                <div className="form-group col-md-3">
                  <label htmlFor="reference1" className="form-label">
                    Referencia 1
                  </label>
                  <input
                    id="reference1"
                    type="text"
                    className={`form-control form-control-user ${errors.reference1 && "is-invalid"
                      }`}
                    {...register("reference1", { required: true })}
                  />
                  {errors.reference1 && (
                    <span className="invalid-feedback">
                      La referencia 1 es requerida
                    </span>
                  )}
                </div>
                <div className="form-group col-md-3">
                  <label htmlFor="reference2" className="form-label">
                    Referencia 2
                  </label>
                  <input
                    id="reference2"
                    type="text"
                    className={`form-control form-control-user ${errors.reference2 && "is-invalid"
                      }`}
                    {...register("reference2", { required: true })}
                  />
                  {errors.reference2 && (
                    <span className="invalid-feedback">
                      La referencia 2 es requerida
                    </span>
                  )}
                </div>
              </div>
              {rowEdited && (
                <div className="row">
                  <div className="col s12 m12">
                    <h6 className="m-0 font-weight-bold text-primary">
                      Dirección actual
                    </h6>
                    <input
                      id="currentAddress"
                      readOnly="true"
                      type="text"
                      className={`form-control form-control-user ${errors.name && "is-invalid"
                        }`}
                      {...register("currentAddress")}
                    />
                  </div>
                </div>
              )}
              <div
                style={{
                  border: "1px solid #e3e6f0",
                  borderRadius: "0.35rem ",
                  marginTop: "20px",
                  marginBottom: "10px",
                }}
              >
                <div
                  className="row"
                  style={{ marginLeft: "5px", marginRight: "5px" }}
                >
                  <div className="col s12 m6">
                    <div className="form-group">
                      <label htmlFor="direction" className="form-label">
                        Generador de direcciones
                      </label>
                      <input
                        {...register("direction", { required: true })}
                        id="direction"
                        type="text"
                        className={`form-control`}
                      />
                    </div>
                  </div>
                </div>
                <div className="row" style={{ marginLeft: "5px" }}>
                  <div className="col s12 m12">
                    <div className="mb-2">
                      <h6 className="m-0 font-weight-bold text-primary">Vía</h6>
                    </div>
                  </div>
                </div>
                <div
                  className="row"
                  style={{
                    border: "1px solid #e3e6f0",
                    borderRadius: "0.35rem ",
                    marginLeft: "5px",
                    marginRight: "5px",
                  }}
                >
                  <div className="form-group col-md-3">
                    <label htmlFor="indicativeRoad" className="form-label">
                      Indicativo de la vía
                    </label>
                    <select
                      {...register("indicativeRoad", { required: true })}
                      className={`custom-select`}
                      id="indicativeRoad"
                    >
                      <option value={""}>Seleccionar…</option>
                      {ADDRESSROADTYPES.map((ele, key) => (
                        <option key={key} value={ele.name}>
                          {ele.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group col-md-3">
                    <label htmlFor="roadNumber" className="form-label">
                      Numero de la vía
                    </label>
                    <input
                      {...register("roadNumber", { required: true })}
                      id="roadNumber"
                      type="text"
                      className={`form-control`}
                    />
                  </div>
                  <div className="form-group col-md-3">
                    <label htmlFor="appendixRoad" className="form-label">
                      Apéndice
                    </label>
                    <select
                      {...register("appendixRoad")}
                      className={`custom-select`}
                      id="appendixRoad"
                    >
                      <option value={""}>Seleccionar…</option>
                      {ADDRESSNOMENCLATURE.map((ele, key) => (
                        <option key={key} value={ele.name}>
                          {ele.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group col-md-3">
                    <label htmlFor="crossoverRoad" className="form-label">
                      Orientación
                    </label>
                    <select
                      {...register("crossoverRoad")}
                      className={`custom-select`}
                      id="crossoverRoad"
                    >
                      <option value={""}>Seleccionar…</option>
                      {ADDRESSCARDINALPOINT.map((ele, key) => (
                        <option key={key} value={ele.name}>
                          {ele.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div
                  className="row"
                  style={{ marginLeft: "5px", marginTop: "5px" }}
                >
                  <div className="col s12 m12">
                    <div className="mb-2">
                      <h6 className="m-0 font-weight-bold text-primary">
                        Cruce
                      </h6>
                    </div>
                  </div>
                </div>
                <div
                  className="row"
                  style={{
                    border: "1px solid #e3e6f0",
                    borderRadius: "0.35rem ",
                    marginLeft: "5px",
                    marginRight: "5px",
                  }}
                >
                  <div className="form-group col-md-3">
                    <label htmlFor="crossoverNumber" className="form-label">
                      Numero de cruce
                    </label>
                    <input
                      {...register("crossoverNumber", { required: true })}
                      id="crossoverNumber"
                      type="text"
                      className={`form-control`}
                    />
                    {errors.crossoverNumber && (
                      <span className="invalid-feedback">
                        El número es requerido
                      </span>
                    )}
                  </div>
                  <div className="form-group col-md-3">
                    <label
                      htmlFor="appendixCrossingNumber"
                      className="form-label"
                    >
                      Apéndice
                    </label>
                    <select
                      {...register("appendixCrossingNumber")}
                      className={`custom-select`}
                      id="appendixCrossingNumber"
                    >
                      <option value={""}>Seleccionar…</option>
                      {ADDRESSNOMENCLATURE.map((ele, key) => (
                        <option key={key} value={ele.name}>
                          {ele.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group col-md-3">
                    <label
                      htmlFor="orientationCrossingNumber"
                      className="form-label"
                    >
                      Orientación
                    </label>
                    <select
                      {...register("orientationCrossingNumber")}
                      className={`custom-select`}
                      name="orientationCrossingNumber"
                      id="orientationCrossingNumber"
                    >
                      <option value={""}>Seleccionar…</option>
                      {ADDRESSCARDINALPOINT.map((ele, key) => (
                        <option key={key} value={ele.name}>
                          {ele.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group col-md-3">
                    <label htmlFor="doorNumber" className="form-label">
                      Numero de la puerta
                    </label>
                    <input
                      {...register("doorNumber", { required: true })}
                      id="doorNumber"
                      type="text"
                      className={`form-control`}
                    />
                  </div>
                </div>
                <div
                  className="row"
                  style={{
                    marginLeft: "5px",
                    marginTop: "5px",
                    marginRight: "5px",
                  }}
                >
                  <div className="form-group col-md-3">
                    <label htmlFor="insideTypes" className="form-label">
                      Tipos de Interior
                    </label>
                    <select
                      {...register("insideTypes")}
                      className={`custom-select`}
                      id="insideTypes"
                    >
                      <option value={""}>Seleccionar…</option>
                      {INSIDE_TYPES.map((ele, key) => (
                        <option key={key} value={ele.name}>
                          {ele.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group col-md-3">
                    <label htmlFor="inside" className="form-label">
                      Interior
                    </label>
                    <input
                      {...register("inside")}
                      id="inside"
                      type="text"
                      className={`form-control`}
                    />
                  </div>
                </div>
                <div
                  className="row"
                  style={{
                    marginLeft: "5px",
                    marginRight: "5px",
                  }}
                >
                  <div className="form-group col-md-3">
                    <label htmlFor="country" className="form-label">
                      Pais
                    </label>
                    <select
                      {...register("country")}
                      id="country"
                      className={`custom-select ${errors.country && "is-invalid"
                        }`}
                    >
                      <option value={""}>Seleccionar…</option>
                      {countries &&
                        Object.keys(countries).length > 0 &&
                        countries.items.map((ele, key) => (
                          <option key={key} value={ele.idCountry}>
                            {ele.description}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="form-group col-md-3">
                    <label htmlFor="department" className="form-label">
                      Departamento
                    </label>
                    <select
                      {...register("department")}
                      id="department"
                      className={`custom-select ${errors.department && "is-invalid"
                        }`}
                    >
                      <option value={""}>Seleccionar…</option>
                      {departmentsByCountry &&
                        Object.keys(departmentsByCountry).length > 0 &&
                        departmentsByCountry.map((ele, key) => (
                          <option key={key} value={ele.idDepartment}>
                            {ele.description}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="form-group col-md-3">
                    <label htmlFor="city" className="form-label">
                      Ciudad
                    </label>
                    <select
                      {...register("city", { required: true })}
                      id="city"
                      className={`custom-select ${errors.city && "is-invalid"}`}
                    >
                      <option value={""}>Seleccionar…</option>
                      {citiesByDepartment &&
                        Object.keys(citiesByDepartment).length > 0 &&
                        citiesByDepartment.map((ele, key) => (
                          <option key={key} value={ele.idCity}>
                            {ele.description}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="form-group col-md-3">
                    <label htmlFor="neighborhood" className="form-label">
                      Barrio
                    </label>
                    <select
                      {...register("idNeighborhood", { required: true })}
                      id="idNeighborhood"
                      className={`custom-select ${errors.idNeighborhood && "is-invalid"
                        }`}
                    >
                      <option value={""}>Seleccionar…</option>
                      {neighborhoodsByCity &&
                        Object.keys(neighborhoodsByCity).length > 0 &&
                        neighborhoodsByCity.map((ele, key) => (
                          <option key={key} value={ele.idNeighborhood}>
                            {ele.description}
                          </option>
                        ))}
                    </select>
                    {errors.idNeighborhood && (
                      <span className="invalid-feedback">
                        El Barrio es requerido
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-3">
                  <label htmlFor="clientGuide" className="form-label">
                    Guía del Cliente
                  </label>
                  <input
                    id="clientGuide"
                    type="text"
                    className={`form-control form-control-user ${errors.clientGuide && "is-invalid"
                      }`}
                    {...register("clientGuide", { required: true })}
                  />
                  {errors.clientGuide && (
                    <span className="invalid-feedback">
                      La guía de cliente es requerida
                    </span>
                  )}
                </div>
                <div className="form-group col-md-3">
                  <label htmlFor="declaredValue" className="form-label">
                    Valor declarado
                  </label>
                  <input
                    id="declaredValue"
                    type="text"
                    className={`form-control form-control-user ${errors.declaredValue && "is-invalid"
                      }`}
                    {...register("declaredValue", { required: true })}
                  />
                  {errors.declaredValue && (
                    <span className="invalid-feedback">
                      El valor declarado es requerido
                    </span>
                  )}
                </div>
                {session && session.role.idCompany == null && (
                  <div className="form-group col-md-3">
                    <label htmlFor="idCompany" className="form-label">
                      Empresa
                    </label>
                    <select
                      {...register("idCompany", { required: true })}
                      id="idCompany"
                      className={`custom-select ${errors.idCompany && "is-invalid"
                        }`}
                    >
                      <option value={""}>Seleccionar…</option>
                      {companies &&
                        Object.keys(companies).length > 0 &&
                        companies.items.map((ele, key) => (
                          <option key={key} value={ele.idCompany}>
                            {ele.description}
                          </option>
                        ))}
                    </select>
                    {errors.idCompany && (
                      <span className="invalid-feedback">
                        La empresa es requerida
                      </span>
                    )}
                  </div>
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
      <div>
        <Modal
          show={showUpload}
          onHide={handleCloseUpload}
          backdrop="static"
          keyboard={false}
        >
          <form onSubmit={handleSubmitUpload(onSubmitUpload)}>
            <Modal.Header closeButton>
              <Modal.Title>Cargar archivo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row">
                <div className="form-group col-md-12">
                  <div className="custom-file">
                    <input
                      type="file"
                      id="file"
                      name="file"
                      {...registerUpload("file", { required: true })}
                      id="file"
                      className={`custom-file-input ${errorsUpload.file && "is-invalid"
                        }`}
                    />{" "}
                    <label
                      className="custom-file-label"
                      htmlFor="validatedCustomFile"
                    >
                      {fileError
                        ? fileError
                        : fileName
                          ? fileName
                          : "Seleccionar archivo..."}
                    </label>
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseUpload}>
                Cancelar
              </Button>
              <Button variant="primary" type="submit" disabled={fileError}>
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
    addresses: state.addressState.addresses,
    address: state.addressState.address,
    rowEdited: state.addressState.rowEdited,
    rowDeleted: state.addressState.rowDeleted,
    rowUpdated: state.addressState.rowUpdated,
    companies: state.companyState.companies,
    fileUploaded: state.addressState.fileUploaded,
    cities: state.cityState.cities,
    neighborhoodsByCity: state.neighborhoodState.neighborhoodsByCity,
    countries: state.countryState.countries,
    departmentsByCountry: state.departmentState.departmentsByCountry,
    citiesByDepartment: state.cityState.citiesByDepartment,
    zoneNeighborhoods: state.zoneNeighborhoodState.zoneNeighborhoods,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    reduxGetZoneNeighborhoods: (payload) =>
      dispatch({
        type: "FETCH_ZONENEIGHBORHOODS_REQUEST",
        value: payload,
      }),
    reduxGetCompanies: (payload) =>
      dispatch({
        type: "FETCH_COMPANIES_REQUEST",
        value: payload,
      }),
    reduxGetAddresses: (payload) =>
      dispatch({
        type: "FETCH_ADDRESSES_REQUEST",
        value: payload,
      }),
    reduxPostAddress: (payload) =>
      dispatch({
        type: "CREATE_ADDRESS_REQUEST",
        value: payload,
      }),
    reduxGetAddress: (payload) =>
      dispatch({
        type: "READ_ADDRESS_REQUEST",
        value: payload,
      }),
    reduxDeleteAddress: (payload) =>
      dispatch({
        type: "DELETE_ADDRESS_REQUEST",
        value: payload,
      }),
    reduxPatchAddress: (payload) =>
      dispatch({
        type: "UPDATE_ADDRESS_REQUEST",
        value: payload,
      }),
    reduxResetAddressForm: () =>
      dispatch({
        type: "RESET_ADDRESS_FORM",
      }),
    reduxUploadFile: (payload) =>
      dispatch({
        type: "UPLOAD_ADDRESS_REQUEST",
        value: payload,
      }),
    reduxGetCities: (payload) =>
      dispatch({
        type: "FETCH_CITIES_REQUEST",
        value: payload,
      }),
    reduxGetNeighborhoodsByCity: (payload) =>
      dispatch({
        type: "READBYCITY_NEIGHBORHOOD_REQUEST",
        value: payload,
      }),
    reduxGetCountries: (payload) =>
      dispatch({
        type: "FETCH_COUNTRIES_REQUEST",
        value: payload,
      }),
    reduxGetDepartmentsByCountry: (payload) =>
      dispatch({
        type: "READBYCOUNTRY_DEPARTMENT_REQUEST",
        value: payload,
      }),
    reduxGetCitiesByDepartment: (payload) =>
      dispatch({
        type: "READBYDEPARTMENT_CITY_REQUEST",
        value: payload,
      }),
    reduxGetNeighborhoodsByCity: (payload) =>
      dispatch({
        type: "READBYCITY_NEIGHBORHOOD_REQUEST",
        value: payload,
      }),
    reduxSetDepartment: (payload) =>
      dispatch({
        type: "RESET_BYCOUNTRY_DEPARTMENT",
        value: payload,
      }),
    reduxSetCity: (payload) =>
      dispatch({
        type: "RESET_BYDEPARTMENT_CITY",
        value: payload,
      }),
    reduxSetNeighborhood: (payload) =>
      dispatch({
        type: "RESET_BYCITY_NEIGHBORHOOD",
        value: payload,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Address);

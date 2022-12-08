import { useState, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Modal,
  Button,
  Card,
  CardBody,
  CardTitle,
  Input,
} from "reactstrap";

import CardCalculator from "components/Custom/CardCalculator";

import { useRootStore } from "store/rootStore";
import { useReactToPrint } from "react-to-print";
import { v4 as uuidv4 } from "uuid";
import CustomModal from "components/Custom/CustomModal";

const TYPE = { EXPENSE: 1, INCOME: 2, SAVING: 3 };

const clearRefs = (refs) => {
  const values = Object.values(refs);
  values.forEach((ref) => {
    ref.current.value = "";
  });
};

const getValues = (refs) => {
  const values = Object.values(refs);
  return values.map((ref) => ref.current.value);
};

function BasicModal({ title, isOpen, toggle, children, onExit, onSave }) {
  return (
    <CustomModal
      isOpen={isOpen}
      toggle={toggle}
      header={title}
      footer={
        <div className="w-100 d-flex justify-content-between">
          <Button
            size="sm"
            outline
            color="danger"
            className="text-uppercase"
            onClick={onExit}
          >
            <i className="fa fa-times mr-1" />
            Annuler
          </Button>
          <Button
            outline
            size="sm"
            color="primary"
            className="text-uppercase"
            onClick={onSave}
          >
            <i className="fa fa-save mr-1" />
            Enregistrer
          </Button>
        </div>
      }
    >
      <Container>{children}</Container>
    </CustomModal>
  );
}

function StatsCard({ label, value, icon, color, description }) {
  return (
    <Card className="card-stats mb-4 mb-xl-0 border">
      <CardBody>
        <Row>
          <div className="col">
            <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
              {label}
            </CardTitle>
            <span className="h2 font-weight-bold mb-0">{value}</span>
          </div>
          <Col className="col-auto">
            <div
              className={`icon icon-shape bg-${color} text-white rounded-circle`}
            >
              <i className={`fas fa-${icon}`} />
            </div>
          </Col>
        </Row>
        <p className="mt-3 mb-0 text-muted text-sm">
          <small className="text-nowrap">{description}</small>
        </p>
      </CardBody>
    </Card>
  );
}

const Tables = () => {
  const { root, setRoot } = useRootStore((state) => state);

  const [state, setState] = useState({
    add: false,
    settings: false,
    navbar: false,
  });

  const updateState = (args) =>
    setState((prevState) => ({ ...prevState, ...args }));

  const toggle = (key) => () => updateState({ [key]: !state[key] });

  const addRefs = {
    title: useRef(null),
    type: useRef(null),
  };

  const settingsRefs = {
    title: useRef(null),
    type: useRef(null),
    lang: useRef(null),
    font: useRef(null),
  };

  const templateRef = useRef(null);

  const saveComponent = () => {
    const refs = addRefs;
    const [title, type] = getValues(refs);

    if (title && type) {
      const rootClone = { ...root };
      const element = { id: uuidv4(), title, items: [], type: parseInt(type) };
      rootClone.elements.push(element);
      setRoot(rootClone);

      clearRefs(refs);
      toggle("add")();
    }
  };

  const saveSettings = (e) => {
    const value = settingsRefs.font.current.value;
    // if (value) {
    //   const id = parseInt(value);
    //   const font = fonts.find((f) => f.id === id);
    //   if (font) {
    //     setFont(font);
    //     toggle("settings")();
    //   }
    // }
  };

  const handlePrint = useReactToPrint({
    content: () => templateRef.current,
    documentTitle: "my-pdf",
    // onAfterPrint: () => alert("Successfully generated !"),
  });

  const pageStyle = `
  @page {size: auto;margin: 25mm 10mm 10mm 10mm;}
    html, body {
    // font-size: 9px;
    // overflow:visible;
  }`;

  const total = { expense: 0, income: 0, saving: 0 };

  return (
    <>
      <Container fluid className="pt-0 pt-sm-3 pt-md-7">
        <div ref={templateRef}>
          <style>{pageStyle}</style>
          {/* <Row>
            <Col>
              <h1 className="my-5 text-center">{root.label}</h1>
            </Col>
          </Row> */}

          <Row className="my-4 mt-sm-0 justify-content-end">
            <Col
              xs={6}
              className="col-md-auto my-2 d-flex justify-content-center"
            >
              <Button
                className="w-100"
                outline
                size="sm"
                color="primary"
                onClick={toggle("add")}
              >
                <i className="fa fa-plus mr-1" />
                Ajouter
              </Button>
            </Col>
            <Col
              xs={6}
              className="col-md-auto my-2 d-flex justify-content-center"
            >
              <Button
                className="w-100"
                outline
                size="sm"
                color="dark"
                onClick={toggle("settings")}
              >
                <i className="fa fa-cog mr-1" />
                Préférences
              </Button>
            </Col>
            <Col
              xs={6}
              className="col-md-auto my-2 d-flex justify-content-center"
            >
              <Button
                className="w-100"
                outline
                size="sm"
                color="success"
                onClick={(e) => alert("Option non disponiple")}
              >
                <i className="fa fa-file-excel mr-1" />
                Exporter CSV
              </Button>
            </Col>
            <Col
              xs={6}
              className="col-md-auto my-2 d-flex justify-content-center"
            >
              <Button
                className="w-100"
                outline
                size="sm"
                color="danger"
                onClick={handlePrint}
              >
                <i className="fa fa-file-pdf mr-1" />
                Exporter PDF
              </Button>
            </Col>
          </Row>

          <Row className="mb-0 mb-lg-4">
            <Col lg="6" xl="3">
              <StatsCard
                label="Revenus"
                value={0}
                icon="arrow-right"
                color="success"
                description="Revenus totals du mois"
              />
            </Col>
            <Col lg="6" xl="3">
              <StatsCard
                label="Différence"
                value={total.income - total.expense}
                icon="expand-alt"
                color="yellow"
                description="Différence entre Revenus et Dépenses"
              />
            </Col>
            <Col lg="6" xl="3">
              <StatsCard
                label="Epargne"
                value={0}
                icon="arrow-down"
                color="info"
                description="Epargne total du mois"
              />
            </Col>
            <Col lg="6" xl="3">
              <StatsCard
                label="Dépenses"
                value={0}
                icon="arrow-left"
                color="warning"
                description="Dépenses totales du mois"
              />
            </Col>
          </Row>

          <Row>
            {root.elements.map((element, i) => {
              return (
                <Col key={i} xs={12} lg={6} className="mb-4">
                  <CardCalculator element={element} />
                </Col>
              );
            })}
          </Row>
        </div>
      </Container>

      <BasicModal
        title="Préférences"
        isOpen={state.settings}
        toggle={toggle("settings")}
        onExit={toggle("settings")}
        onSave={saveSettings}
      >
        <select
          ref={settingsRefs.lang}
          defaultValue={2}
          className="form-control mb-3"
        >
          <option value="1">العربية</option>
          <option value="2">Français</option>
          <option value="3">English</option>
        </select>

        {/* <select
          ref={settingsRefs.font}
          defaultValue={font.id}
          className="form-select form-select-lg mb-3"
        >
          {fonts &&
            fonts.length > 0 &&
            fonts.map((f, i) => (
              <option key={i} value={f.id}>
                {f.name}
              </option>
            ))}
        </select> */}

        <select
          // ref={settingsRefs.lang}
          defaultValue={2}
          className="form-control mb-3"
        >
          <option value="1">Moroccan Dirham (DH)</option>
          <option value="2">Euro (€)</option>
          <option value="2">Pound (£)</option>
          <option value="3">Dollar ($)</option>
        </select>
      </BasicModal>

      <BasicModal
        title="Add a new component"
        isOpen={state.add}
        toggle={toggle("add")}
        onExit={toggle("add")}
        onSave={saveComponent}
      >
        <Input
          className="mb-3"
          type="text"
          name="title"
          id="title"
          innerRef={addRefs.title}
          placeholder="Title"
        />
        <select ref={addRefs.type} defaultValue="" className="form-control">
          <option value="">Type</option>
          <option value={TYPE.EXPENSE}>Expense</option>
          <option value={TYPE.INCOME}>Income</option>
          <option value={TYPE.SAVING}>Saving</option>
        </select>
      </BasicModal>
    </>
  );
};

export default Tables;

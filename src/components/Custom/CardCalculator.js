import React, { useEffect, useState, useRef } from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  Container,
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Table,
  Button,
  Modal,
  Input,
  FormGroup,
} from "reactstrap";
import { useRootStore } from "store/rootStore";
import { v4 as uuidv4 } from "uuid";

const checkArray = (array) => array && array.length;

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

function CardCalculator({ element }) {
  const refs = {
    title: useRef(null),
    expected: useRef(null),
    real: useRef(null),
  };
  const { root, setRoot } = useRootStore((state) => state);
  const updateRoot = (args) => setRoot({ ...root, ...args });

  const [total, setTotal] = useState({ expected: 0, real: 0, difference: 0 });
  const updateTotal = (args) =>
    setTotal((prevState) => ({ ...prevState, ...args }));

  const [add, setAdd] = useState(false);
  const toggleAdd = () => setAdd(!add);

  const saveItem = () => {
    let [title, expected, real] = getValues(refs);

    if (title) {
      expected = parseInt(expected) || 0;
      real = parseInt(real) || 0;
      const difference = expected - real;
      clearRefs(refs);
      refs.title.current.focus();

      const elements = root.elements.map((elm) => {
        if (elm.id === element.id)
          elm.items.push({ id: uuidv4(), title, expected, real, difference });
        return elm;
      });

      updateRoot({ elements });
    }
  };

  const deleteItem = (j) => () => {
    const elements = root.elements.map((elm) => {
      if (elm.id === element.id)
        elm.items = elm.items.filter((_, k) => k !== j);
      return elm;
    });
    updateRoot({ elements });
  };

  const deleteMe = () => {
    const elements = root.elements.filter((elm) => elm.id !== element.id);
    updateRoot({ elements });
  };

  useEffect(() => {
    let total = { expected: 0, real: 0, difference: 0 };
    if (checkArray(element.items)) {
      total = element.items.reduce((acc, item) => {
        const expected = acc.expected + item.expected;
        const real = acc.real + item.real;
        const difference = acc.difference + (item.expected - item.real);
        return { expected, real, difference };
      });
    }
    updateTotal(total);
  }, [JSON.stringify(element.items)]);

  useEffect(() => {
    if (add) {
      clearRefs(refs);
      refs.title.current.focus();
    }
  }, [add]);

  let status = { icon: "arrow-left", color: "warning" };

  if (element.type === 2) status = { icon: "arrow-right", color: "success" };
  if (element.type === 3) status = { icon: "funnel-dollar", color: "info" };

  const { icon, color } = status;

  return (
    <Card className="border">
      <CardHeader className="border-0">
        <Row>
          <Col>
            <h3 className="mb-0 text-uppercase">
              <i className={`fa fa-${icon} text-${color} mr-3`} />
              {/* <div
                className={`icon icon-shape bg-${color} text-white rounded-circle mr-2`}
              >
                <i className={`fa fa-${icon}`} />
              </div> */}
              {element.title}
            </h3>
          </Col>

          <Col className="d-flex justify-content-end col-auto">
            <UncontrolledDropdown>
              <DropdownToggle
                className="btn-icon-only bg-transparent text-light shadow-none border-0"
                href="#pablo"
                role="button"
                size="sm"
                onClick={(e) => e.preventDefault()}
              >
                <i className="fas fa-ellipsis-v" />
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem
                  className="text-danger"
                  href="#pablo"
                  onClick={deleteMe}
                >
                  <i className="fa fa-trash" />
                  Supprimer
                </DropdownItem>
                <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                  <i className="ni ni-settings" />
                  Modifier
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Col>
        </Row>
      </CardHeader>
      <Table className="align-items-center table-flush" responsive>
        <thead className="thead-transparent">
          <tr>
            <th scope="col"></th>
            <th scope="col">Prévu</th>
            <th scope="col">Réel</th>
            <th scope="col" className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {element.items.map((item, i) => (
            <tr key={i}>
              <td>
                <span className="mb-0 text-sm">{item.title}</span>
              </td>
              <td>{item.expected}</td>
              <td>{item.real}</td>
              {/* <td>
              <div className="text-success">
                <i className="ni ni-check-bold" />
              </div>
            </td> */}

              <td className="text-center">
                <Button
                  onClick={deleteItem(i)}
                  size="sm"
                  className="shadow-none bg-transparent border-0 p-0"
                >
                  <i className="fa fa-trash text-danger" />
                </Button>
              </td>
            </tr>
          ))}

          <tr>
            <th scope="row">
              <span className="mb-0 text-sm">Total</span>
            </th>
            <td>{total.expected}</td>
            <td>{total.real}</td>

            {/* <td>
              <div className="text-success">
                <i className="ni ni-check-bold" />
              </div>
            </td> */}

            <td className="text-center">
              {!add && (
                <Button
                  onClick={toggleAdd}
                  size="sm"
                  className="shadow-none bg-transparent border-0 p-0"
                >
                  <i className="ni ni-fat-add ni-2x text-success" />
                </Button>
              )}
            </td>
          </tr>
        </tbody>
      </Table>
      {add && (
        <CardFooter>
          <Row>
            <Col xs={12} sm={4} className="col-auto">
              <FormGroup>
                <Input innerRef={refs.title} type="text" placeholder="Titre" />
              </FormGroup>
            </Col>
            <Col xs={12} sm={4} className="col-auto">
              <FormGroup>
                <Input
                  innerRef={refs.expected}
                  type="number"
                  placeholder="Prévu"
                />
              </FormGroup>
            </Col>
            <Col xs={12} sm={4} className="col-auto">
              <FormGroup>
                <Input innerRef={refs.real} type="number" placeholder="Réel" />
              </FormGroup>
            </Col>
          </Row>

          <Button
            onClick={toggleAdd}
            color="danger"
            size="sm"
            className="shadow-none text-uppercase"
            outline
          >
            <i className="fa fa-times mr-2" />
            Quitter
          </Button>

          <Button
            onClick={saveItem}
            color="success"
            size="sm"
            className="shadow-none text-uppercase float-right"
            outline
          >
            <i className="fa fa-save mr-2" />
            Enregistrer
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}

export default CardCalculator;

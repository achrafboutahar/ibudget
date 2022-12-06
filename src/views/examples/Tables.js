// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
  Col,
  Button,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";

const Tables = () => {
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row>
                  <Col>
                    <h3 className="mb-0 text-uppercase">
                      <div className="icon icon-shape bg-success text-white rounded-circle mr-2">
                        <i className="fa fa-arrow-right" />
                      </div>
                      Revenu
                    </h3>
                  </Col>

                  <Col className="d-flex justify-content-end">
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
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="ni ni-fat-delete" />
                          Supprimer
                        </DropdownItem>
                        <DropdownItem
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="ni ni-settings" />
                          Modifier
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </Col>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Titre</th>
                    <th scope="col">Prévu</th>
                    <th scope="col">Réel</th>
                    <th scope="col">Status</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <span className="mb-0 text-sm">Argon Design System</span>
                    </td>
                    <td>2500 MAD</td>
                    <td>2500 MAD</td>
                    <td>
                      <div className="text-success">
                        <i className="ni ni-check-bold" />
                      </div>
                    </td>

                    <td className="text-right">
                      <Button
                        size="sm"
                        className="shadow-none bg-transparent border-0 p-0"
                      >
                        <i className="ni ni-fat-remove ni-2x text-danger" />
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">
                      <span className="mb-0 text-sm">Total</span>
                    </th>
                    <td>2500 MAD</td>
                    <td>2500 MAD</td>
                    <td>
                      <div className="text-success">
                        <i className="ni ni-check-bold" />
                      </div>
                    </td>

                    <td className="text-right">
                      <Button
                        size="sm"
                        className="shadow-none bg-transparent border-0 p-0"
                      >
                        <i className="ni ni-fat-add ni-2x text-success" />
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
              <CardFooter></CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Tables;

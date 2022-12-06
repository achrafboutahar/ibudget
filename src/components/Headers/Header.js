// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

const Header = ({ total }) => {
  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Dépenses
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">0</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fas fa-arrow-left" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <small className="text-nowrap">
                        Dépenses totales du mois
                      </small>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Revenus
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">0</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-success text-white rounded-circle shadow">
                          <i className="fas fa-arrow-right" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-nowrap">
                        Revenus totals du mois
                      </span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Différence
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{0}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="fas fa-expand-alt" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <small className="text-nowrap">
                        Différence entre Revenus et Dépenses
                      </small>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Epargne
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">0</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="fa fa-arrow-down" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <small className="text-nowrap">
                        Epargne total du mois
                      </small>
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;

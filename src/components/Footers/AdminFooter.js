// reactstrap components
import { Row, Col } from "reactstrap";
import "../../assets/scss/myCustomScss/footer.scss";

const Footer = () => {
  return (
    <footer>
      <Row>
        <Col xl="12">
          <div className="copyright text-center text-xl-center text-muted">
            © {new Date().getFullYear()}{" "}
            <a
              className="font-weight-bold ml-1"
              href="_blank"
              rel="noopener noreferrer"
              target="_blank"
            >
              Payroll Management
            </a>
          </div>
        </Col>
      </Row>
    </footer>
  );
};

export default Footer;

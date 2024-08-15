import { Container, Row, Col, Button } from "react-bootstrap";
import Style from "./AddPropertyCard.module.css"
import { Link } from 'react-router-dom'
export default function AddQuickCard() {
    return (
        <div style={{
            position: "fixed",
            bottom: "20px",
            left: "20px"
        }}>
            <Link to="/add-quick-property">
                <Button variant="outline-primary" className={Style.btn}
                    size="lg">اضف اعلان سريع</Button>
            </Link>
        </div>
    )
}
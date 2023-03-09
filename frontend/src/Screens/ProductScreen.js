import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message.js";
import Loader from "../components/Loader.js";
import { listProductDetails } from "../actions/productActions.js";

import {
  Form,
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  // Button,
  ListGroupItem,
} from "react-bootstrap";

const ProductScreen = ({ props }) => {
  const [qty, setQty] = useState(1);

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, products } = productDetails;
  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };
  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products && (
            <Col md={6}>
              <Image src={products.image} alt={products.name} fluid />
            </Col>
          )}
          <Col xl={3}>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h2>{products.name}</h2>
              </ListGroupItem>
              <ListGroupItem>
                <Rating
                  value={products.rating}
                  text={`${products.numReviews} reviews`}
                />
              </ListGroupItem>
              <ListGroupItem>Price: ${products.price}</ListGroupItem>
              <ListGroupItem>Description: {products.description}</ListGroupItem>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${products.price}</strong>
                    </Col>
                  </Row>
                </ListGroupItem>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {products.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {products.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(products.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item
                  onClick={addToCartHandler}
                  className="btn btn-block"
                  type="button"
                  disabled={products.countInStock === 0}
                >
                  Add To Cart
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;

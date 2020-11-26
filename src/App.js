import React, { Component, useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import PayPal from "./components/Paypal";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        this.setState({
          isLoading: true,
          items: json,
        });
      });
  }

  componentDidCatch() {
    fetch("https://fakestoreapi.com/carts/6", {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        this.setState({
          isLoading: this,
          items: json,
        });
      });
  }

  render() {
    var { isLoading, items } = this.state;

    if (!isLoading) {
      return (
        <div className="container-loader">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    } else {
      return (
        <div className="App">
          <div className="container px-4 py-5 mx-auto">
            <div className="row d-flex justify-content-center">
              <div className="col-5">
                <h4 className="heading">Shopping Bag</h4>
              </div>
              <div className="col-7">
                <div className="row text-right">
                  <div className="col">
                    <h6 className="mt-2">Category</h6>
                  </div>
                  <div className="col">
                    <h6 className="mt-2">Quantity</h6>
                  </div>
                  <div className="col">
                    <h6 className="mt-2">Price</h6>
                  </div>
                  <div className="col"></div>
                </div>
              </div>
            </div>

            {items.map((item, key) => {
              return <Products item={item} key={key} />;
            })}

            <div className="row justify-content-center">
              <Payments />
            </div>
          </div>
        </div>
      );
    }
  }
}

const Payments = () => {
  return (
    <div className="col-lg-12">
      <div className="card">
        <div className="row">
          <div className="col-lg-3 radio-group">
            <div className="row d-flex px-3 radio">
              {" "}
              <img
                className="pay"
                src="https://i.imgur.com/WIAP9Ku.jpg"
                alt="Credit"
              />
              <p className="my-auto">Credit Card</p>
            </div>
            <div className="row d-flex px-3 radio gray">
              {" "}
              <img
                className="pay"
                src="https://i.imgur.com/OdxcctP.jpg"
                alt="Debit"
              />
              <p className="my-auto">Debit Card</p>
            </div>
            <div className="row d-flex px-3 radio gray mb-3">
              {" "}
              <img
                className="pay"
                src="https://i.imgur.com/cMk1MtK.jpg"
                alt="PayPal"
              />
              <p className="my-auto">PayPal</p>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="row px-2">
              <div className="form-group col-md-6">
                {" "}
                <label className="form-control-label">Name on Card</label>{" "}
                <input
                  type="text"
                  id="cname"
                  name="cname"
                  placeholder="Johnny Doe"
                />{" "}
              </div>
              <div className="form-group col-md-6">
                {" "}
                <label className="form-control-label">Card Number</label>{" "}
                <input
                  type="text"
                  id="cnum"
                  name="cnum"
                  placeholder="1111 2222 3333 4444"
                />{" "}
              </div>
            </div>
            <div className="row px-2">
              <div className="form-group col-md-6">
                {" "}
                <label className="form-control-label">
                  Expiration Date
                </label>{" "}
                <input type="text" id="exp" name="exp" placeholder="MM/YYYY" />{" "}
              </div>
              <div className="form-group col-md-6">
                {" "}
                <label className="form-control-label">CVV</label>{" "}
                <input type="text" id="cvv" name="cvv" placeholder="***" />{" "}
              </div>
            </div>
          </div>
          <div className="col-lg-4 mt-2">
            <div className="row d-flex justify-content-between px-4">
              <p className="mb-1 text-left">Subtotal</p>
              <h6 className="mb-1 text-right">$23.49</h6>
            </div>
            <div className="row d-flex justify-content-between px-4">
              <p className="mb-1 text-left">Shipping</p>
              <h6 className="mb-1 text-right">$2.99</h6>
            </div>
            <div className="row d-flex justify-content-between px-4" id="tax">
              <p className="mb-1 text-left">Total (tax included)</p>
              <h6 className="mb-1 text-right">$26.48</h6>
            </div>{" "}
            <button
              className="btn-block btn-blue"
              onClick={() => {
               
              }}
            >
              {" "}
              <span>
                {" "}
                <span id="checkout">Checkout</span>{" "}
                <span id="check-amt">$26.48</span>{" "}
              </span>{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Products = ({ item }) => {
  const {
    category = "no category",
    description,
    id,
    image,
    price,
    title,
  } = item;

  const [Quantity, setQuantity] = useState(1);
  const [priceTag, setPriceTag] = useState(price);
  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  useEffect(() => {
    const newPrice = price * Quantity;
    setPriceTag(newPrice);
  }, [Quantity]);

  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => {
      if (prevQuantity > 1) {
        return prevQuantity - 1;
      }
      return prevQuantity;
    });
  };

  return (
    <div className="row d-flex justify-content-center border-top">
      <div className="col-5">
        <div className="row d-flex">
          <div className="col d-flex justify-content-center">
            <img src={image} className="book-img" alt={title} />
          </div>
          <div className="my-auto flex-column d-flex pad-left">
            <h6 className="mob-text">{title}</h6>
            <p className="mob-text">{description}</p>
          </div>
        </div>
      </div>
      <div className="my-auto col-7">
        <div className="row text-right">
          <div className="col">
            <p className="mob-text">{category}</p>
          </div>
          <div className="col">
            <div className="row d-flex justify-content-end px-3">
              <p className="mb-0" id="cnt1">
                <span>{Quantity}</span>
              </p>
              <div className="d-flex flex-column plus-minus">
                <span className="vsm-text plus" onClick={increaseQuantity}>
                  +
                </span>
                <span className="vsm-text minus" onClick={decreaseQuantity}>
                  -
                </span>
              </div>
            </div>
          </div>
          <div className="col">
            <h6 className="mob-text">Unit Price: ${price}</h6>
            <h6 className="mob-text">Cost: ${priceTag}</h6>
          </div>
          <div className="col">
            <button type="button" className="btn btn-danger">
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

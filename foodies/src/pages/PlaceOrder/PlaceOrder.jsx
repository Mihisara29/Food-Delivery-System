import React, { useContext, useState } from "react";
import { assests } from "../../assets/assests";
import { StoreContext } from "../../context/StoreContext";
import { calculateCartTotals } from "../../util/cartUtils";
import axios from "axios";

const PlaceOrder = () => {
  const { foodList, quantities, setQuantities, token } =
    useContext(StoreContext);
  const cartItems = foodList.filter((food) => quantities[food.id] > 0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    district: "",
    zip: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setIsProcessing(true);
    setError(null);

    try {
      const orderData = {
        userAddress: `${data.firstName}, ${data.lastName},${data.address}, ${data.city}, ${data.district} ${data.district}`,
        phoneNumber: data.phoneNumber,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        city: data.city,
        district: data.district,
        amount: total.toFixed(2),
        orderedItems: cartItems.map((item) => ({
          foodId: item.id,
          quantity: quantities[item.id],
          price: item.price * quantities[item.id],
          category: item.category,
          imageUrl: item.imageUrl,
          description: item.description,
          name: item.name,
        })),
      };

      const response = await axios.post(
        "http://localhost:8080/api/orders/create",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      window.location.href = response.data.paymentUrl;
    } catch (error) {
      console.error("Order submission failed:", error.response?.data || error.message);
        setError(error.response?.data?.message || "Failed to process order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const { shipping, tax, total } = calculateCartTotals(cartItems, quantities);

  return (
    <div>
      {/* Checkout Form */}
      <div className="container mb-5">
        <main>
          <div className="mt-2 mb-5 text-center">
            <img
              src={assests.logo}
              alt="Logo"
              className="d-block mx-auto mb-4"
              width="98"
              height="98"
            />
          </div>
          <div className="row g-5">
            {/* Cart Summary */}
            <div className="col-md-5 col-lg-4 order-md-last">
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-primary">Your cart</span>
                <span className="badge bg-primary rounded-pill">
                  {cartItems.length}
                </span>
              </h4>
              <ul className="list-group mb-3">
                {cartItems.map((item) => (
                  <li
                    key={item.id}
                    className="list-group-item d-flex justify-content-between lh-sm"
                  >
                    <div>
                      <h6 className="my-0">{item.name}</h6>
                      <small className="text-body-secondary">
                        Qty: {quantities[item.id]}
                      </small>
                    </div>
                    <span className="text-body-secondary">
                      LKR.{(item.price * quantities[item.id]).toFixed(2)}
                    </span>
                  </li>
                ))}

                <li className="list-group-item d-flex justify-content-between">
                  <span>Tax and Shipping Fee</span>
                  <span>LKR.{(tax + shipping).toFixed(2)}</span>
                </li>

                <li className="list-group-item d-flex justify-content-between">
                  <span>Total (LKR)</span>
                  <strong>{total.toFixed(2)}</strong>
                </li>
              </ul>
            </div>

            {/* Billing Address Form */}
            <div className="col-md-7 col-lg-8">
              <h4 className="mb-3">Billing address</h4>
              <form className="needs-validation" onSubmit={onSubmitHandler}>
                <div className="row g-3">
                  <div className="col-sm-6">
                    <label htmlFor="firstName" className="form-label">
                      First name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      placeholder="Kamal"
                      required
                      name="firstName"
                      onChange={onChangeHandler}
                      value={data.firstName}
                    />
                  </div>

                  <div className="col-sm-6">
                    <label htmlFor="lastName" className="form-label">
                      Last name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      placeholder="Perera"
                      name="lastName"
                      onChange={onChangeHandler}
                      required
                    />
                  </div>

                  <div className="col-12">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <div className="input-group has-validation">
                      <span className="input-group-text">@</span>
                      <input
                        type="email"
                        className="form-control"
                        id="username"
                        required
                        name="email"
                        onChange={onChangeHandler}
                        value={data.email}
                      />
                    </div>
                  </div>

                  <div className="col-12">
                    <label htmlFor="address" className="form-label">
                      Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      placeholder="1234 Main St"
                      required
                      value={data.address}
                      name="address"
                      onChange={onChangeHandler}
                    />
                  </div>

                  <div className="col-12">
                    <label htmlFor="phone" className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      id="phone"
                      placeholder="0771234567"
                      required
                      value={data.phoneNumber}
                      name="phoneNumber"
                      onChange={onChangeHandler}
                      pattern="[0-9]{10}"
                    />
                  </div>

                  <div className="col-md-5">
                    <label htmlFor="country" className="form-label">
                      District
                    </label>
                    <select
                      className="form-select"
                      id="district"
                      required
                      name="district"
                      value={data.district}
                      onChange={onChangeHandler}
                    >
                      <option value="">Choose...</option>
                      <option>Galle</option>
                    </select>
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="mainCity" className="form-label">
                      Main City
                    </label>
                    <select
                      className="form-select"
                      name="city"
                      value={data.city}
                      id="city"
                      onChange={onChangeHandler}
                      required
                    >
                      <option value="">Choose...</option>
                      <option>Ambalangoda</option>
                    </select>
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="zip" className="form-label">
                      Zip
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="zip"
                      placeholder="12385"
                      required
                      name="zip"
                      value={data.zip}
                      onChange={onChangeHandler}
                    />
                  </div>
                </div>

                <hr className="my-4" />

                <button
                  className="w-100 btn btn-primary btn-lg"
                  type="submit"
                  disabled={cartItems.length === 0 || isProcessing}
                >
                  {isProcessing ? "Processing..." : "Continue to checkout"}
                </button>
                {error && (
                  <div className="alert alert-danger mt-3">{error}</div>
                )}
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PlaceOrder;

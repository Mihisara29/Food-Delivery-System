import React, { useEffect, useState } from "react";
import axios from "axios";
import { assets } from "../../assets/assets";

const Orders = () => {
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    const response = await axios.get("http://localhost:8080/api/orders/all");
    setData(response.data);
  };

  const updateStatus = async (event, orderId) => {
    const response = await axios.patch(
      `http://localhost:8080/api/orders/status/${orderId}?status=${event.target.value}`
    );
    if (response.status === 200) {
      await fetchOrders();
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          <div className="card shadow rounded-4 border-0 overflow-hidden">
            <div className="card-header bg-gradient p-4 border-0 d-flex align-items-center justify-content-between">
              <h4 className="mb-0 fw-semibold text-dark">
                <i className="bi bi-bag-check-fill me-2 text-primary"></i>
                My Orders
              </h4>
              <span className="badge bg-secondary rounded-pill">
                Total: {data.length}
              </span>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="bg-light text-dark">
                    <tr>
                      <th style={{ width: "60px" }}></th>
                      <th>Items & Address</th>
                      <th>Amount</th>
                      <th>Count</th>
                      <th>Status</th>
                      <th className="text-end">Update</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((order, index) => (
                      <tr
                        key={index}
                        className="border-top transition-all hover-shadow-sm"
                      >
                        <td>
                          <div
                            className="d-flex align-items-center justify-content-center bg-light rounded-circle"
                            style={{ width: "48px", height: "48px" }}
                          >
                            <img
                              src={assets.parcel}
                              alt="parcel"
                              height={32}
                              width={32}
                            />
                          </div>
                        </td>
                        <td>
                          <div className="fw-medium mb-1 text-truncate">
                            {order.orderedItems.map((item, idx) => (
                              <span key={idx}>
                                {item.name} × {item.quantity}
                                {idx !== order.orderedItems.length - 1 && ", "}
                              </span>
                            ))}
                          </div>
                          <small className="text-muted d-block">
                            <i className="bi bi-geo-alt-fill me-1 text-danger"></i>
                            {order.userAddress}
                          </small>
                        </td>
                        <td className="fw-bold text-success">
                          LKR {order.amount.toFixed(2)}
                        </td>
                        <td className="text-muted">{order.orderedItems.length}</td>
                        <td>
                          <span
                            className={`badge px-3 py-2 fw-semibold text-capitalize shadow-sm ${
                              order.orderStatus === "completed"
                                ? "bg-success-subtle text-success"
                                : order.orderStatus === "pending"
                                ? "bg-primary-subtle text-primary"
                                : order.orderStatus === "cancelled"
                                ? "bg-danger-subtle text-danger"
                                : "bg-warning-subtle text-warning"
                            }`}
                          >
                            {order.orderStatus}
                          </span>
                        </td>
                        <td className="text-end">
                          <select
                            className="form-select form-select-sm w-auto d-inline-block border rounded-pill"
                            onChange={(event) => updateStatus(event, order.id)}
                            value={order.orderStatus}
                          >
                            <option value="pending">Pending</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="delivered">Delivered</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {data.length === 0 && (
                  <div className="text-center py-5">
                    <i className="bi bi-box-seam display-4 text-muted"></i>
                    <p className="mt-3 text-muted">No orders found</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;

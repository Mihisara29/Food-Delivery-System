import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assests } from "../../assets/assests";
import "./MyOrders.css";

const MyOrders = () => {
  const { token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    const response = await axios.get("http://localhost:8080/api/orders", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setData(response.data);
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          <div className="card shadow-sm">
            <div className="card-header bg-white border-bottom-0">
              <h4 className="mb-0">My Orders</h4>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th scope="col" style={{ width: "60px" }}></th>
                      <th scope="col">Items</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Count</th>
                      <th scope="col">Status</th>
                      <th scope="col" style={{ width: "50px" }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((order, index) => (
                      <tr key={index} className="align-middle">
                        <td>
                          <div className="bg-light rounded p-2" style={{ width: "48px", height: "48px" }}>
                            <img 
                            src={assests.delivery}
                            alt=""
                            height={40}
                            width={40}
                            />
                          </div>
                        </td>
                        <td>
                          <div className="text-truncate" >
                            {order.orderedItems.map((item, idx) => (
                              <span key={idx}>
                                {item.name} × {item.quantity}
                                {idx !== order.orderedItems.length - 1 && ", "}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="fw-bold">LKR {order.amount.toFixed(2)}</td>
                        <td>{order.orderedItems.length}</td>
                        <td>
                          <span className={`badge rounded-pill ${
                            order.orderStatus === 'deliverd' ? 'bg-success' :
                            order.orderStatus === 'pending' ? 'bg-primary' :
                            order.orderStatus === 'cancelled' ? 'bg-danger' : 'bg-warning'
                          }`}>
                            {order.orderStatus}
                          </span>
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-outline-secondary rounded-circle"
                            onClick={fetchOrders}
                            title="Refresh"
                          >
                            <i className="bi bi-arrow-clockwise"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {data.length === 0 && (
                  <div className="text-center py-5">
                    <i className="bi bi-box-seam display-5 text-muted"></i>
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

export default MyOrders;
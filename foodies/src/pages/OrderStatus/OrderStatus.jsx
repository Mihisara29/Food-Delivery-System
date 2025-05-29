import { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";

const OrderStatus = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useContext(StoreContext);

  const query = new URLSearchParams(location.search);
  const orderId = query.get("order_id");

  const getStatusBadge = (status) => {
    if (!status) return <span className="badge bg-secondary">Unknown</span>;

    const statusMap = {
      paid: "success",
      pending: "warning",
      failed: "danger",
      canceled: "secondary",
      processing: "info",
    };

    const normalizedStatus = String(status).toLowerCase();
    const badgeClass = statusMap[normalizedStatus] || "info";

    return <span className={`badge bg-${badgeClass}`}>{status}</span>;
  };

  useEffect(() => {
    console.log(orderId);
    const checkOrderStatus = async () => {
      try {
        console.log("Token being sent:", token);
        const response = await axios.get(
          `http://localhost:8080/api/orders/${orderId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

        if (!response.data) {
          throw new Error("Order not found");
        }

        // Handle MongoDB _id if needed
        const orderData = response.data._id
          ? { ...response.data, id: response.data._id }
          : response.data;

        if (!orderData.paymentStatus) {
          throw new Error("Order data is incomplete");
        }

        setOrder(orderData);
      } catch (error) {
        console.error("Error fetching order status:", error);

      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      checkOrderStatus();
    } else {
      setError("No order ID provided in URL");
      setLoading(false);
    }
  }, [orderId, token, navigate]);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "50vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <span className="ms-3">Loading order details...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          <h4 className="alert-heading">Error</h4>
          <p>{error}</p>
          <button
            className="btn btn-outline-danger mt-2"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
          <a href="/" className="btn btn-outline-secondary mt-2 ms-2">
            Return to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-header bg-white border-bottom-0">
              <h2 className="h4 mb-0 text-center">Order Status</h2>
            </div>

            {order && (
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h3 className="h5 mb-0">Order #{order.id}</h3>
                  {getStatusBadge(order.paymentStatus)}
                </div>

                <div className="mb-4">
                  <h4 className="h6 text-muted mb-3">Order Summary</h4>
                  <div className="table-responsive">
                    <table className="table">
                      <tbody>
                        <tr>
                          <th scope="row">Amount</th>
                          <td className="text-end">
                            LKR {order.amount?.toFixed(2)}
                          </td>
                        </tr>
                        {order.paymentStatus === "paid" &&
                          order.stripePaymentId && (
                            <tr>
                              <th scope="row">Transaction ID</th>
                              <td className="text-end text-muted small">
                                {order.stripePaymentId}
                              </td>
                            </tr>
                          )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {order.paymentStatus === "paid" ? (
                  <div className="alert alert-success d-flex align-items-center">
                    <i className="bi bi-check-circle-fill me-2"></i>
                    <div>
                      <h5 className="alert-heading mb-1">
                        Payment Successful!
                      </h5>
                      <p className="mb-0">Thank you for your order.</p>
                    </div>
                  </div>
                ) : (
                  <div className="alert alert-warning">
                    <h5 className="alert-heading">
                      Payment {order.paymentStatus}
                    </h5>
                    <p>Your payment is currently being processed.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStatus;

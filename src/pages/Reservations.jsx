import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
} from "@mui/material";

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmIzMWE1MTQ4MDBkOGU5YzkyNzJmYzYiLCJpYXQiOjE3MzU2NDEyNjksImV4cCI6MTczNTY3NzI2OX0.t0K5pi6Z6dxZWJZtijn8wZVotO_eWWtyXL-WDhLU3Z0";
 console.log("reservations",reservations);
 
  // Fetch reservations data
  const fetchReservations = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://server.hatimiretreats.com/v1/booking/list-reservations/099338a1-3ba2-4f02-aaad-0903fa39584c",
        { page, pageSize },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReservations(response?.data.data || []); // Assuming response has 'reservations' array
    } catch (error) {
      console.error("Error fetching reservations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, [page, pageSize]);

  // Handle fetching invoice
  const fetchInvoice = async (bookingId) => {
    try {
      // Send request to fetch PDF as a blob
      const response = await axios.get(
        `http://localhost:8080/v1/booking/updated-invoice/${bookingId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob", // Ensure we get a binary response (PDF)
        }
      );
  
      // Create a URL for the fetched PDF data
      const fileURL = URL.createObjectURL(response.data);
  
      // Open the PDF in a new window/tab
      const newWindow = window.open(fileURL, "_blank");
  
      // Check if the window was successfully opened
      if (newWindow) {
        newWindow.focus();
      } else {
        alert("Please allow popups to view the invoice.");
      }
  
    } catch (error) {
      console.error("Error fetching invoice:", error);
      alert("Failed to fetch the invoice.");
    }
  };
  
  
  
  
  

  return (
    <div style={{ padding: "15px" }}>
      <h2>Reservations</h2>

      {/* Search and Filters */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <TextField
          label="Start Date"
          type="date"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="End Date"
          type="date"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Search for guests, bookings..."
          variant="outlined"
          fullWidth
        />
      </div>

      {/* Table */}
      {loading ? (
        <p>Loading reservations...</p>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Booking ID</strong>
                </TableCell>
                <TableCell>
                  <strong>Room No</strong>
                </TableCell>
                <TableCell>
                  <strong>Guest</strong>
                </TableCell>
                <TableCell>
                  <strong>Check In</strong>
                </TableCell>
                <TableCell>
                  <strong>Check Out</strong>
                </TableCell>
                <TableCell>
                  <strong>Status</strong>
                </TableCell>
                <TableCell>
                  <strong>Payment Status</strong>
                </TableCell>
                <TableCell>
                  <strong>Invoice</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reservations?.map((reservation) => (
                <TableRow key={reservation.id}>
                  <TableCell>{reservation.booking_id}</TableCell>
                  <TableCell>
                    {reservation.room_info
                      ?.map((room) => room.room_number)
                      .join(", ")}
                  </TableCell>
                  <TableCell>{reservation.customer_info.name}</TableCell>
                  <TableCell>{reservation.check_in}</TableCell>
                  <TableCell>{reservation.check_out}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color={
                        reservation.booking_status === "confirmed"
                          ? "primary"
                          : "error"
                      }
                    >
                      {reservation.booking_status}
                    </Button>
                  </TableCell>
                  <TableCell
                    style={{
                      color:
                        reservation.payment_status === "success"
                          ? "green"
                          : "red",
                    }}
                  >
                    {reservation.payment_status}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => fetchInvoice(reservation._id)}
                    >
                      Get Invoice
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default Reservations;

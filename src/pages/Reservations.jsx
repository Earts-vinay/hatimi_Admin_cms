import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie"; // Import js-cookie library
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
  Box,
  TablePagination,
  Pagination,
} from "@mui/material";
import HashLoader from "react-spinners/HashLoader";

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0); // Adjusted for 0-based index
  const [rowsPerPage, setRowsPerPage] = useState(20); // Rows per page
  const [propertyUid, setPropertyUid] = useState(localStorage.getItem("property_uid"));

  const token = Cookies.get("token"); 

  // Fetch reservations data
  const fetchReservations = async () => {
    if (!propertyUid) {
      console.error("No property UID found in cookies");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `https://server.hatimiretreats.com/v1/booking/list-reservations/${propertyUid}`, 
        {}, // Empty request body
        {
          params: {
            page: page + 1, // Send 1-based page index as query parameter
            pageSize: rowsPerPage,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setReservations(response?.data || []);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    } finally {
      setLoading(false);
    }
  };

  // This effect will run when propertyUid is changed
  useEffect(() => {
    if (propertyUid) {
      fetchReservations();
    }
  }, [propertyUid, page, rowsPerPage]); // Watch for changes in propertyUid, page, and rowsPerPage

  // Handle fetching invoice
  const fetchInvoice = async (bookingId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/v1/booking/updated-invoice/${bookingId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob", // Ensure we get a binary response (PDF)
        }
      );

      const fileURL = URL.createObjectURL(response.data);
      const newWindow = window.open(fileURL, "_blank");
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

  // Handle Pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div style={{ padding: "10px" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1rem",
          paddingX: "10px",
        }}
      >
        <Box>
          <h2>Reservations</h2>
        </Box>
        <Box sx={{ display: "flex", gap: "1rem" }}>
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
        </Box>
      </div>

      {/* Table */}
      {loading ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "calc(100vh - 160px)",
          }}
        >
          <HashLoader color="#1D525B" />
        </Box>
      ) : (
        <>
          <TableContainer
            component={Paper}
            sx={{
              height: "calc(100vh - 160px)", // Adjusted height for pagination
              overflow: "auto",
            }}
          >
            <Table>
              <TableHead
                sx={{
                  backgroundColor: "#7cabb3",
                  color: "#fff",
                  position: "sticky",
                  top: 0,
                }}
              >
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
                {reservations?.data?.map((reservation) => (
                  <TableRow key={reservation.id}>
                    <TableCell>{reservation.booking_id}</TableCell>
                    <TableCell>
                      {reservation.room_info
                        ?.map((room) => room.room_number)
                        .join(", ")}
                    </TableCell>
                    <TableCell>{reservation?.customer_info.name}</TableCell>
                    <TableCell>{reservation.check_in}</TableCell>
                    <TableCell>{reservation.check_out}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color={
                          reservation.booking_status === "confirmed"
                            ? "primary"
                            : reservation.booking_status === "blocked"
                            ? "warning"
                            : "error"
                        }
                        sx={{ position: "inherit !important" }}
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
                        variant="outlined"
                        color="primary"
                        sx={{ position: "inherit !important" }}
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
          {/* Pagination */}
          <Box
            sx={{
              paddingTop: "15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Pagination
              count={reservations.totalPages}
              color="primary"
              page={page}
              onChange={handleChangePage}
            />
          </Box>
        </>
      )}
    </div>
  );
};

export default Reservations;

import React, { useEffect, useState } from "react";
import fontFamily from "../utils/fonts";
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
  Pagination,
  CircularProgress,
  Typography,
} from "@mui/material";
import HashLoader from "react-spinners/HashLoader";
import { useDispatch, useSelector } from "react-redux";
import colors from "../utils/colors";
import { fetchReservations } from "../redux/Slices/Reservations/reservationSlice";
import { fetchInvoice } from "../redux/Slices/Reservations/invoiceSlice";
import CustomSearch from "../components/custom/CustomSearch";

const Reservations = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(20);
  const [searchTerm, setSearchTerm] = useState("");
  const { reservations, totalPages, loading, } = useSelector((state) => state.reservations);
  const { loadingId, fileURL, error } = useSelector((state) => state.invoice);
  const selectedPropertyUid = useSelector((state) => state.properties.selectedPropertyUid);

  // Fetch reservations data
  useEffect(() => {
    if (selectedPropertyUid) {
      dispatch(fetchReservations({ selectedPropertyUid, page, rowsPerPage }));
    }
  }, [selectedPropertyUid, page, rowsPerPage, dispatch]);


  // Fetch invoice function
  const handleFetchInvoice = (bookingId) => {
    dispatch(fetchInvoice({ bookingId }));
  };

  React.useEffect(() => {
    if (fileURL) {
      const newWindow = window.open(fileURL, "_blank");
      if (!newWindow) alert("Please allow popups to view the invoice.");
    }
  }, [fileURL]);

  // Handle Pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const filteredData = searchTerm
    ? reservations?.data.filter((item) => {
      const search = searchTerm.trim().toLowerCase();
      return (
        item.booking_id.toString().toLowerCase().includes(search) ||
        item.customer_info.name?.toLowerCase().includes(search)
      );
    })
    : reservations.data;

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
          <Typography variant="h5" sx={{ fontFamily }}>Reservations</Typography>
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
          <CustomSearch label="Search for guests, bookings" onChange={(e) => setSearchTerm(e.target.value)} />

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
          <TableContainer component={Paper} sx={{ height: "calc(100vh - 160px)", overflow: "auto", }}>
            <Table>
              <TableHead sx={{ backgroundColor: colors.green, position: "sticky", top: 0 }}>
                <TableRow>
                  {["Booking ID", "Room No", "Guest", "Check In", "Check Out", "Status", "Payment Status", "Invoice"].map((text) => (
                    <TableCell key={text} sx={{ color: "#fff", fontFamily }}>
                      {text}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredData?.length > 0 ? (
                  filteredData.map((reservation) => (
                    <TableRow key={reservation.id}>
                      <TableCell sx={{ fontFamily }}>{reservation.booking_id}</TableCell>
                      <TableCell sx={{ fontFamily }}>
                        {reservation.room_info?.map((room) => room.room_number).join(", ")}
                      </TableCell>
                      <TableCell sx={{ fontFamily }}>
                        {reservation?.customer_info.name}
                      </TableCell>
                      <TableCell sx={{ fontFamily }}>{reservation.check_in}</TableCell>
                      <TableCell sx={{ fontFamily }}>{reservation.check_out}</TableCell>
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
                          sx={{ position: "inherit !important", textTransform: "capitalize" }}
                        >
                          {reservation.booking_status}
                        </Button>
                      </TableCell>
                      <TableCell
                        style={{
                          color:
                            reservation.payment_status === "success" ? "green" : "red",
                          fontFamily,
                        }}
                      >
                        {reservation.payment_status}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          color="primary"
                          sx={{ position: "inherit !important", textTransform: "capitalize" }}
                          onClick={() => handleFetchInvoice(reservation._id)}
                          disabled={loadingId === reservation._id} // Disable only the clicked button
                        >
                          {loadingId === reservation._id ? (
                            <>
                              <CircularProgress
                                size={20}
                                sx={{ color: "primary.main", mr: 1 }}
                              />
                              Get Invoice
                            </>
                          ) : (
                            "Get Invoice"
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} align="center" sx={{ fontFamily, py: 3 }}>
                      No Data Available
                    </TableCell>
                  </TableRow>
                )}
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
              count={totalPages}
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

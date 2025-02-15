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
import { DatePicker } from "antd";
import dayjs from "dayjs";
import CustomButton from "../components/custom/CustomButton";

const { RangePicker } = DatePicker;
const Reservations = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [rowsPerPage] = useState(20);
  const [dates, setDates] = useState(null);
  const { reservations, totalPages, loading } = useSelector((state) => state.reservations);
  const { loadingId, fileURL } = useSelector((state) => state.invoice);
  const selectedPropertyUid = useSelector((state) => state.properties.selectedPropertyUid);
  const [filteredData, setFilteredData] = useState([]);
  console.log("dates", dates);

  useEffect(() => {
    if (selectedPropertyUid) {
      dispatch(fetchReservations({ selectedPropertyUid, page, rowsPerPage }));
    }
  }, [selectedPropertyUid, page, rowsPerPage, dispatch]);

  const handleFetchInvoice = (bookingId) => {
    dispatch(fetchInvoice({ bookingId }));
  };
  useEffect(() => {
    if (reservations?.data?.length > 0) {
      setFilteredData(reservations?.data)
    }
  }, [reservations.data])

  useEffect(() => {
    if (fileURL) {
      const newWindow = window.open(fileURL, "_blank");
      if (!newWindow) alert("Please allow popups to view the invoice.");
    }
  }, [fileURL]);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleDateChange = (values) => {

    if (values?.length > 0) {
      setDates(values)
      console.log([dayjs(values[0]).format("YYYY-MM-DD"), dayjs(values[1]).format("YYYY-MM-DD")]);
      const start = dayjs(values[0]).format("YYYY-MM-DD");
      const end = dayjs(values[1]).format("YYYY-MM-DD");
      console.log(start, reservations.data, end);
      const filteredData = reservations.data.filter((booking, ind) => {
        if ((new Date(booking.check_in) >= new Date(start)) && (new Date(booking.check_out) <= new Date(end))) {
          return booking

        }
      })
      console.log("fil", filteredData);
      setFilteredData(filteredData);



    } else {
      setDates([]);
      setFilteredData(reservations?.data)
    }
  };

  const handleSearch = (event) => {
    const filteredData = event.target.value
      ? reservations?.data.filter((item) => {
        const search = event.target.value.trim().toLowerCase();
        return (
          item.booking_id.toString().toLowerCase().includes(search) ||
          item.customer_info.name?.toLowerCase().includes(search)
        );
      })
      : reservations.data;
    setFilteredData(filteredData)
  }

  return (
    <div style={{ padding: "10px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
          paddingX: "10px",
        }}
      >
        <Box>
          <Typography variant="h5" sx={{ fontFamily }}>Reservations</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <RangePicker value={dates} onChange={handleDateChange} format="YYYY-MM-DD" allowClear style={{ width: "100%", height: 38 }} />
          <CustomSearch label="Search for guests, bookings" onChange={handleSearch} size='small' />
        </Box>
      </div>

      {loading ? (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "calc(100vh - 160px)" }}>
          <HashLoader color="#1D525B" />
        </Box>
      ) : (
        <>
          <TableContainer component={Paper} sx={{ height: "calc(100vh - 135px)", overflow: "auto" }}>
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
                      <TableCell sx={{ fontFamily,width:"280px" }}>{reservation?.customer_info.name}</TableCell>
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
                          sx={{ position: "inherit !important", textTransform: "capitalize",width:"100px" }}
                        >
                          {reservation.booking_status}
                        </Button>
                   

                      </TableCell>
                      <TableCell
                        style={{
                          color:
                            reservation.payment_status === "success"
                              ? "green"
                              : reservation.payment_status === "pending"
                                ? "orange"
                                : "red",
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
                          disabled={loadingId === reservation._id}
                        >
                          {loadingId === reservation._id ? (
                            <>
                              <CircularProgress size={20} sx={{ color: "primary.main", mr: 1 }} />
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
          <Box sx={{ paddingTop: "15px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Pagination count={totalPages} color="primary" page={page} onChange={handleChangePage} />
          </Box>
        </>
      )}
    </div>
  );
};

export default Reservations;

import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "../styles/table.css";

export default function TableForm({ info, deleteInfo, edit }) {
  const [trigger, setTrigger] = useState(0);
  useEffect(() => {
    setTrigger(trigger + 1);
  }, [info]);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="centre">Name</TableCell>
            <TableCell align="centre">Mobile Number</TableCell>
            <TableCell align="centre">Gender</TableCell>
            <TableCell align="centre">Age</TableCell>
            <TableCell align="centre">Edit</TableCell>
            <TableCell align="centre">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {info?.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">{row.Name}</TableCell>
              <TableCell align="left">{row.Ph_number}</TableCell>
              <TableCell align="left">{row.Gender}</TableCell>
              <TableCell align="left">{row.Age}</TableCell>
              <TableCell
                align="right"
                onClick={() => edit(row)}
                className="edit"
              >
                <EditIcon
                  color="primary"
                  fontSize="large"
                  className="editIcon"
                />
              </TableCell>
              <TableCell align="right" onClick={() => deleteInfo(row.id)}>
                <DeleteIcon
                  color="secondary"
                  fontSize="large"
                  className="edit"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

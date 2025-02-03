import React, { useEffect } from "react";
import { useTable } from "react-table";
import { CheckIcon, XIcon } from "@heroicons/react/solid";
import io from "socket.io-client";
import { API_BASE_URL } from "../../utils/constants";

const OrderTable = ({ data }) => {
  // Initialize socket connection
  const socket = io.connect(`${API_BASE_URL}`); // Update the URL if needed
  const columns = React.useMemo(
    () => [
      {
        Header: "Action",
        Cell: ({ row }) => (
          <div className="flex space-x-2">
            <button
              className="p-2 bg-green-500 rounded hover:bg-green-600 text-white"
              onClick={() => handleAccept(row.original)}
            >
              <CheckIcon className="h-5 w-5" />
            </button>
            <button
              className="p-2 bg-red-500 rounded hover:bg-red-600 text-white"
              onClick={() => handleReject(row.original)}
            >
              <XIcon className="h-5 w-5" />
            </button>
          </div>
        ),
      },
      { Header: "User", accessor: "user_name" },
      { Header: "Order Name", accessor: "order_name" },
      { Header: "Order Quantity", accessor: "order_quantity" },
      { Header: "Delivery Address", accessor: "delivery_address" },
      { Header: "Platform", accessor: "platform" },
      { Header: "Total Amount", accessor: "total_amount" },
    ],
    []
  );

  const tableInstance = useTable({ columns, data });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  const handleAccept = (rowData) => {
    alert(`Accepted order: ${rowData.order_name}`);
  };

  const handleReject = (rowData) => {
    alert(`Rejected order: ${rowData.order_name}`);
  };

  useEffect(() => {
    // Listen for 'newOrder' events from the server
    socket.on('newOrder', (order) => {
        console.log(order);
        alert("New order placed");
    });

    // Clean up the socket connection
    return () => socket.off('newOrder');
  }, []);


  return (
    <div
      className={
        "mt-10 max-h-[" + 300 + "px] overflow-y-auto overflow-x-auto relative"
      }
    >
      <table
        {...getTableProps()}
        className="min-w-full bg-white shadow-md rounded-lg"
      >
        <thead className="bg-gray-200 sticky top-0 z-10">
          {headerGroups.map((headerGroup) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              className="text-left text-gray-700"
            >
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} className="p-4 font-semibold">
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="divide-y divide-gray-200">
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="border-t text-gray-600">
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    className="p-4 whitespace-nowrap"
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;

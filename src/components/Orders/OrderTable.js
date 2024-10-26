import React from "react";
import { useTable } from "react-table";
import { CheckIcon, XIcon } from "@heroicons/react/solid";

const OrderTable = ({ data }) => {
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

  return (
    <div className="overflow-x-auto mt-10">
      <table
        {...getTableProps()}
        className="min-w-full bg-white shadow-md rounded-lg overflow-hidden"
      >
        <thead className="bg-gray-200">
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
        <tbody {...getTableBodyProps()}>
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

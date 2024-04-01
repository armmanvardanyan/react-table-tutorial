import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import React from "react";
import DATA from "../data";
import { useState } from "react";
import { Box } from "@chakra-ui/react";
import { flexRender } from "@tanstack/react-table";

const columns = [
  {
    header: "Task",
    accessorKey: "task",
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: (props) => <p>{props.getValue()?.name}</p>,
  },
  {
    header: "Due",
    accessorKey: "due",
    cell: (props) => <p>{props.getValue()?.toLocaleTimeString()}</p>,
  },
  {
    header: "Notes",
    accessorKey: "notes",
    cell: (props) => <p>{props.getValue()}</p>,
  },
];

export default function TaskTable() {
  const [data, setData] = useState(DATA);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  console.log(table.getRowModel());

  return (
    <Box>
      <Box className="table" w={table.getTotalSize()}>
        {table.getHeaderGroups().map((headerGroup) => (
          <Box className="tr" key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <Box key={header.id} className="th" w={header.getSize()}>
                {header.column.columnDef.header}
              </Box>
            ))}
          </Box>
        ))}
        {table.getRowModel().rows.map((row) => {
          return (
            <Box className="tr" key={row.id}>
              {row.getVisibleCells().map((cell) => {
                return (
                  <Box key={cell.id} w={cell.column.getSize()} className="td">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Box>
                );
              })}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

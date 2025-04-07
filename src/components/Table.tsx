"use client";

import React from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
} from "@tanstack/react-table";

interface TableProps<T extends object> {
  data: T[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<T, any>[];
  isLoading?: boolean;
}

const Table = <T extends object>({
  data,
  columns,
  isLoading,
}: TableProps<T>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="mt-5 overflow-auto">
      <table className="w-full text-left">
        <thead className="bg-black-2 border-b border-black">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="p-3">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td
                colSpan={table.getAllColumns().length}
                className="py-4 px-4 text-center text-grey3 font-medium"
              >
                <span>Loading...</span>
              </td>
            </tr>
          ) : table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row, index) => (
              <React.Fragment key={row.id}>
                <tr>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="pt-2.5 px-3">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
                {index < table.getRowModel().rows.length - 1 && (
                  <tr>
                    <td
                      colSpan={table.getAllColumns().length}
                      className="px-4 pt-3"
                    >
                      <div className="h-px bg-black-2 w-full"></div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))
          ) : (
            <tr>
              <td
                colSpan={table.getAllColumns().length}
                className="py-4 px-4 text-center text-white font-medium"
              >
                No data to show
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

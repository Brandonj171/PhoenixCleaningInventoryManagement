"use client";

import { useGetProductsQuery } from "@/state/api";
import Header from "../component/Header";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

// Adjust quantity function
const adjustQuantity = async (id: string, delta: number) => {
  try {
    await fetch(`/products/${id}/quantity`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ delta }),
    });
    window.location.reload(); // Simple refresh to see updates
  } catch (error) {
    console.error("Failed to adjust quantity:", error);
  }
};

// Columns including + / – buttons
const columns: GridColDef[] = [
  { field: "productId", headerName: "ID", width: 90 },
  { field: "name", headerName: "Product Name", width: 200 },
  {
    field: "price",
    headerName: "Price",
    width: 110,
    type: "number",
    valueGetter: (value, row) => `$${row.price}`,
  },
  {
    field: "rating",
    headerName: "Rating",
    width: 110,
    type: "number",
    valueGetter: (value, row) => (row.rating ? row.rating : "N/A"),
  },
  {
    field: "stockQuantity",
    headerName: "Stock",
    width: 200,
    renderCell: (params) => (
      <div className="flex items-center gap-2">
        <button
          onClick={() => adjustQuantity(params.row.productId, -1)}
          className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          -
        </button>
        <span>{params.value}</span>
        <button
          onClick={() => adjustQuantity(params.row.productId, 1)}
          className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
        >
          +
        </button>
      </div>
    ),
  },
];

const Inventory = () => {
  const { data: products, isError, isLoading } = useGetProductsQuery();

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError || !products) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch products
      </div>
    );
  }

  return (
    <div className="flex flex-col px-6 py-4">
      <Header name="Inventory" />
      <DataGrid
        rows={products}
        columns={columns}
        getRowId={(row) => row.productId}
        checkboxSelection
        className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
      />
    </div>
  );
};

export default Inventory;

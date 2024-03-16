import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "primereact/card";
import { Paginator , PaginatorPageChangeEvent } from "primereact/paginator";

interface Product {
  id: string;
  title: string;
  description: string;
}
function App() {
  const [page, setPage] = useState(1);
  const [perPage , setPerPage] = useState(10);
  const [totalRecords , setTotalRecords] = useState(null); 
  const [products, setProducts] = useState<Product[]>([]);
  const [first , setFirst] = useState(1)

  const fetchProducts = async () => {
    const data = await axios.get(
      `http://localhost:4000/api/v1/product/all-products?title=&description=&category=&page=${page}&perPage=${perPage}`,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZmlzdE5hbWUiOiJhc2hpc2giLCJsYXN0TmFtZSI6IlNyaXZhc3RhdmEiLCJlbWFpbCI6ImFzaGlzaHNyaXZhc3RhdmE3MEBnbWFpbC5jb20iLCJwcm9maWxlUGljIjoiaHR0cHM6Ly9hcGkuZGljZWJlYXIuY29tLzUueC9pbml0aWFscy9zdmc_c2VlZD1hc2hpc2ggU3JpdmFzdGF2YSIsImNyZWF0ZWRBdCI6IjIwMjQtMDItMDhUMTk6MjU6MjQuMzkyWiIsImlhdCI6MTcxMDU3NTI3Mn0.V32x-GF8eSwozhXSfW69gjj8_FVQHdk4cFSi8BpqX_8",
        },
      }
    );
    setProducts(data.data.products);
    setTotalRecords(data.data.totalRecords)
  };

  useEffect(() => {
    fetchProducts();
  }, [page , perPage]);

  const onPageChange = (event : PaginatorPageChangeEvent) => {
    // setFirst(event.first);
    setPage(event.page + 1)
    setFirst(event.first)
    console.log(event);
    setPerPage(event.rows)
  };

  return (
    <div className="product-container">
      {products.map((product) => {
        return (
          <Card
            style={{ width: "15%", margin: "10px" }}
            key={product.id}
            title={product.title}
            className="md:w-25rem"
          >
            <p>{product.description}</p>
          </Card>
        );
      })}

      <Paginator
        first={first}
        rows={perPage}
        totalRecords={totalRecords || 0}
        rowsPerPageOptions={[10, 20, 30]}
        onPageChange={onPageChange}
      />
    </div>
  );
}

export default App;

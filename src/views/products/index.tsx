// MUI Imports
import Grid from '@mui/material/Grid2'
import ProductlistCard from './ProductListCards'
import ProductlistTable from './ProductListTable'


const ProductList = ({ products }: { products?: any[] }) => {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <ProductlistCard />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <ProductlistTable tableData={products} />
      </Grid>
    </Grid>
  )
}

export default ProductList

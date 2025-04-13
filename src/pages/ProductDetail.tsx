import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Container from '@mui/material/Container';
import { useDispatch } from 'react-redux';
import { setLoading } from '../redux/appSlice';
import { toast } from 'react-toastify';
import productService from '../services/ProductService';
import { ProductType } from '../types/Types';
import { Button } from '@mui/material';
import { FaBasketShopping } from "react-icons/fa6";


function ProductDetail() {

    const {productId} = useParams()
    const dispatch = useDispatch()

    const [count,setCount] = useState<number>(0)

    const [product,setProduct] = useState<ProductType | null>()

    const getProductById = async(productId:number) => {
        try {
            dispatch(setLoading(true))
            const product:ProductType =  await productService.getProductById(productId)
            setProduct(product)
        } catch (error) {
            toast.error("Ürün detayları getirilirken hata oluştu." + error)
        }finally{
            dispatch(setLoading(false))
    }
    }

    useEffect(()=>{
        getProductById(Number(productId))
    },[])

      

   

  return (
    <Container maxWidth='lg'>
       {product && <>
       <div style={{display:'flex',flexDirection:'row',alignItems:'flex-start',justifyContent:'flex-start',marginTop:'60px'}}>
            <div>
                <img src={product.image} width={250} height={400} />
            </div>
            <div style={{marginLeft:'55px',marginTop:'60px'}}> 
                <div style={{fontFamily:'arial',fontWeight:'bold',fontSize:'20px'}}>{product.title}</div>
                <div style={{fontFamily:'arial',fontSize:'14px',marginTop:'15px'}}>{product.description}</div>
                <div style={{fontFamily:'arial',fontSize:'27px',marginTop:'25px'}}>{product.price}$</div>

                <div style={{marginTop:'30px'}}>
                    <span onClick={()=>setCount(count+1)} style={{fontSize:'30px',fontWeight:'bold',cursor:'pointer',marginRight:'40px'}}>+</span>
                    <span style={{fontSize:'30px',fontWeight:'bold',cursor:'pointer',marginRight:'40px'}}>{count}</span>
                    <span onClick={()=>setCount(count-1)} style={{fontSize:'30px',fontWeight:'bold',cursor:'pointer',marginRight:'40px'}}>-</span>
                </div>

                <div>
                    <Button color='info' variant='contained' size='small' sx={{textTransform:'none',marginTop:'20px'}}>Sepete Ekle</Button>
                </div>
            </div>
        </div>
       
       </>}

    </Container>
  )
}

export default ProductDetail
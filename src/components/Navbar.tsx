import React from 'react'
import AppBar from '@mui/material/AppBar';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import eicon from '../images/logo.jpg'
import { useNavigate } from 'react-router-dom';
import InputAdornment from '@mui/material/InputAdornment';
import { useDispatch } from 'react-redux';
import { filterProducts, setCurrentUser, setProducts } from '../redux/appSlice';
import { toast } from 'react-toastify';
import ProductService from '../services/ProductService';
import { ProductType } from '../types/Types';
import { FaBasketShopping } from "react-icons/fa6";
import Badge from '@mui/material/Badge';

function Navbar() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const logout = () => {
        localStorage.removeItem("currentUser")
        dispatch(setCurrentUser(null))
        navigate("/login")
        toast.success("Başarıyla çıkış yapıldı.")
    }

    const handleFilter = async (e:React.ChangeEvent<HTMLInputElement>)=>{
       try {
          if(e.target.value){
            dispatch(filterProducts(e.target.value))
          }else{
            //tüm ürünler
             const products:ProductType[]=await ProductService.getAllProducts() 
              dispatch(setProducts(products))
          }
       } 
        catch (error) {
          toast.error("Filtreleme yapılırken hata oluştu.")
       }

    }

  return (
    <AppBar position="static" sx={{backgroundColor:"#454242"}}>
    <Toolbar>
      <IconButton
        onClick={()=>navigate("/")}
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
      >
        <img src={eicon} width={60} height={60}></img>
      </IconButton>
      <Typography  variant="h6" component="div" sx={{ flexGrow: 1,cursor:'pointer' }}>
        Çalışkanlar Ticaret
      </Typography>
      <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
      <TextField
                        onChange={(e:React.ChangeEvent<HTMLInputElement>)=>handleFilter(e)}
                        sx={{width:'300px',marginBottom:'25px',marginRight:'20px'}}
                        id="searchInput"
                        placeholder='Bir şey ara...'
                        slotProps={{
                        input: {
                            startAdornment: (
                            <InputAdornment position="start">
                            
                            </InputAdornment>
                            ),
                            style:{
                                color:'lightgrey',
                                borderBottom:'1px solid lightgrey'
                            }
                        },
                        }}
                        variant="standard"
                        
                    />

      <Badge badgeContent={2} color="warning" sx={{margin:'0px 10px'}}>
          <FaBasketShopping style={{fontSize:'20px',cursor:'pointer'}} />

      </Badge>

     

      <Button
       onClick={logout}
       sx={{textTransform:'none',color:'lightgrey'}} color="inherit">Çıkış Yap</Button>
      </div>
    </Toolbar>
  </AppBar>
  )
}

export default Navbar
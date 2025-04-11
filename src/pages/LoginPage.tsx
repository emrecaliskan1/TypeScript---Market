import React from 'react'
import '../css/RegisterPage.css'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { IoPersonCircle } from "react-icons/io5";
import { FaLock } from "react-icons/fa";
import { Button } from '@mui/material';
import { useFormik } from 'formik';
import { registerPageSchema } from '../schemas/RegisterPageSchema';
import { useNavigate } from 'react-router-dom'
import '../css/LoginPage.css'
import LoginPageService from '../services/LoginPageService';
import { useDispatch } from 'react-redux';
import { setCurrentUser, setLoading } from '../redux/appSlice';
import { UserType } from '../types/Types';
import { toast } from 'react-toastify';

interface CheckUserType{
  result:boolean,
  currentUser:UserType | null
}

function LoginPage() {

  const dispatch = useDispatch();

  const navigate = useNavigate();



  const checkUser = (userList:UserType[],username:string,password:string):CheckUserType => {
    const response:CheckUserType = {
      result:false,
      currentUser:null
    }

    userList.forEach((user:UserType)=>{
      if(user.username === username && user.password === user.password){
          response.result = true
          response.currentUser = user
      }
    })

    return response
  }

  const submit = async(values:any,action:any) => {
    //servis çağırırken
      try { //kişi email şifre girdi.
        dispatch(setLoading(true))
        const response:UserType[] = await LoginPageService.login()
        if(response){
          const checkUserResponse:CheckUserType= checkUser(response,values.username,values.password)

          if(checkUserResponse.result && checkUserResponse.currentUser){
            dispatch(setCurrentUser(checkUserResponse.currentUser))
            localStorage.setItem("currentUser",JSON.stringify(checkUserResponse.currentUser))
            navigate("/")
          }else{

          }
        }
      } catch (error) {
        toast.error("Giriş yapılırken hata oluştu. " + error)
      }
      finally{
        dispatch(setLoading(false))
      }
  }
  
  const {values,handleSubmit,handleChange,errors,resetForm} = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: submit,
    validationSchema:registerPageSchema
  })

  const clearInput =() =>{
    resetForm()
  }

  return (
    <div className='login'>
        <div className='main'>
            <form onSubmit={handleSubmit}>
                <div className='form-div'>
                    <TextField
                        sx={{width:'300px',marginBottom:'25px'}}
                        id="username"
                        placeholder='Kullanıcı Adı'
                        value={values.username}
                        onChange={handleChange}
                        slotProps={{
                        input: {
                            startAdornment: (
                            <InputAdornment position="start">
                            <IoPersonCircle/>
                            </InputAdornment>
                            ),
                        },
                        }}
                        variant="standard"
                        helperText={errors.username && <span style={{color:'red'}}>{errors.username}</span>}
                    />

                    <TextField
                        sx={{width:'300px',marginBottom:'25px'}}
                        id="password"
                        placeholder='Şifre'
                        value={values.password}
                        onChange={handleChange}
                        type='password'
                        slotProps={{
                        input: {
                            startAdornment: (
                            <InputAdornment position="start">
                            <FaLock/>
                            </InputAdornment>
                            ),
                        },
                        }}
                        variant="standard"
                        helperText={errors.password && <span style={{color:'red'}}>{errors.password}</span>}
                    />
                    <div>
                        <Button type='submit' size='small' sx={{textTransform:'none', height:'28px'}} variant='contained' color='info'>Giriş Yap</Button>
                        <Button onClick={clearInput} size='small' sx={{textTransform:'none', height:'28px'}} variant='contained' color='inherit'>Temizle</Button>
                    </div>

                </div>
            </form>
        </div>

    </div>
  )
}

export default LoginPage
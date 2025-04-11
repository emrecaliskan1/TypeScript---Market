import React from 'react'
import '../css/RegisterPage.css'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { IoAccessibilitySharp, IoPersonCircle } from "react-icons/io5";
import { FaLock } from "react-icons/fa";
import { Button } from '@mui/material';
import { useFormik } from 'formik';
import { registerPageSchema } from '../schemas/RegisterPageSchema';
import RegisterPageService from '../services/RegisterPageService';
import { UserType } from '../types/Types';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {

    const navigate = useNavigate()

    const submit = async(values:any,actions:any) => {
        try {
            const payload:UserType = {
                id:String(Math.floor(Math.random()*1000)),
                username: values.username,
                password:values.password,
                balance:1000
            }
            
            const response = await RegisterPageService.register(payload)
            if(response){
                clearInput()
                toast.success("Kullanıcı kayededildi.")
                navigate('/login')
            }
        } catch (error) {
            toast.error("Kullanıcı kaydedilirken hata oluştu.")
        }
    }

    //formik - yup 
    const {values,handleSubmit,handleChange,errors,resetForm} = useFormik({
        initialValues: {
          username: '',
          password: '',
        },
        onSubmit: submit,
        validationSchema:registerPageSchema
      })


      //formik içindeki reset fonk.
      const clearInput =() =>{
        resetForm()
      }


  return (
    <div className='register'>
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
                        <Button type='submit' size='small' sx={{textTransform:'none', height:'28px'}} variant='contained' color='info'>Kaydol</Button>
                        <Button onClick={clearInput} size='small' sx={{textTransform:'none', height:'28px'}} variant='contained' color='inherit'>Temizle</Button>
                    </div>

                </div>
            </form>
        </div>

    </div>
  )
}

export default RegisterPage
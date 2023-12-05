import axios from 'axios';
import { Formik, useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

export default function Register() {

    const baseURL = 'https://ecommerce.routemisr.com/api/';

    const [errorsAPIRespone, seterrorsAPIRespone] = useState('')

    const [loading, setloading] = useState(false)

    // To navigate to login screen
    const navigate = useNavigate();

    async function submitRegister(values) {

        setloading(true)

        let { data } = await axios.post(`${baseURL}v1/auth/signup`, values)
            .catch(error => {
                setloading(false)
                seterrorsAPIRespone(error.response.data.message)
            });

        if (data.message == 'success') {

            seterrorsAPIRespone('');
            setloading(false)
            navigate("/login");

        }
    }

    const validationSchema = Yup.object({

        name: Yup.string().required('Name is required').min(2, 'Min charaters is 2').max('50', 'Max charaters is 50'),
        email: Yup.string().required('email is required').email('invalid email'),
        password: Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{5,10}$/, 'Password not correct'),
        rePassword: Yup.string().required('the Re-Password is required').oneOf([Yup.ref('password')], 'The confirm password is not matached'),
        phone: Yup.string().required('Phone is requred').matches(/^(002)?01[0-25][0-9]{8}$/, 'Invalid Mobile')

    })

    let formik = useFormik({
        initialValues: {

            name: '',
            email: '',
            password: '',
            rePassword: '',
            phone: '',

        },
        validationSchema,
        onSubmit: submitRegister

    })




    return (

        <>
            <div className='container mt-4'>



                <form className=' w-75 mx-auto' onSubmit={formik.handleSubmit}>
                    {errorsAPIRespone ? <p className=' alert alert-danger my-2'>{errorsAPIRespone}</p> : ''}

                    <h4>Register Now:</h4>

                    <label htmlFor="name">name:</label>
                    <input className='form-control' type="text" id="name" value={formik.values.name} onBlur={formik.handleBlur} onChange={formik.handleChange} />

                    {formik.errors.name && formik.touched.name ? <p className=' alert alert-danger my-2'>{formik.errors.name}</p> : ''}


                    <label htmlFor="email">email:</label>
                    <input className='form-control' type="email" id="email" value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} />

                    {formik.errors.email && formik.touched.email ? <p className=' alert alert-danger my-2'>{formik.errors.email}</p> : ''}


                    <label htmlFor="password">password:</label>
                    <input className='form-control' type="password" id="password" value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} />

                    {formik.errors.password && formik.touched.password ? <p className=' alert alert-danger my-2'>{formik.errors.password}</p> : ''}


                    <label htmlFor="rePassword">re-password:</label>
                    <input className='form-control' type="password" id="rePassword" value={formik.values.rePassword} onBlur={formik.handleBlur} onChange={formik.handleChange} />

                    {formik.errors.rePassword && formik.touched.rePassword ? <p className=' alert alert-danger my-2'>{formik.errors.rePassword}</p> : ''}


                    <label htmlFor="phone">mobile:</label>
                    <input className='form-control' maxLength={11} type='tel' id="phone" value={formik.values.phone} onBlur={formik.handleBlur} onChange={formik.handleChange} />

                    {formik.errors.phone && formik.touched.phone ? <p className=' alert alert-danger my-2'>{formik.errors.phone}</p> : ''}

                    {loading ? <button className='btn form-btn ms-auto d-block my-3'>
                        <i className='fa-solid fa-spinner fa-spin fa-2x text-white'></i>
                    </button>
                        : <button type='submit' disabled={!(formik.isValid && formik.dirty)} className=' btn form-btn text-white my-3 d-block ms-auto'>Register</button>}


                </form>
            </div>
        </>
    )
}

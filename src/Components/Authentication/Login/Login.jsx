import { useFormik } from 'formik'
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useContext, useState } from 'react'
import { TokenContext } from '../../../Context/UserToken';
import { Helmet } from 'react-helmet';


export default function Login() {

    const baseURL = 'https://ecommerce.routemisr.com/api/';

    const [errorsAPIRespone, seterrorsAPIRespone] = useState('')

    const { token, settoken } = useContext(TokenContext)

    const [loading, setloading] = useState(false)

    // To navigate to login screen
    const navigate = useNavigate();


    async function submitLogin(values) {

        setloading(true)

        let { data } = await axios.post(`${baseURL}v1/auth/signin`, values)
            .catch(error => {
                setloading(false)
                seterrorsAPIRespone(error.response.data.message)
            });

        if (data.message == 'success') {

            seterrorsAPIRespone('');
            setloading(false);
            localStorage.setItem('freshCartToken', data.token);
            settoken(data.token);
            navigate("/");

        }

    }

    const validationSchema = Yup.object({

        email: Yup.string().required('email is required').email('invalid email'),
        password: Yup.string().required('password is required').matches(/^[A-Z][a-z0-9]{5,10}$/, 'Password not correct'),

    })

    const formik = useFormik({

        initialValues: {

            email: '',
            password: ''
        },
        validationSchema,
        onSubmit: submitLogin

    })

    return (

        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Login</title>
            </Helmet>

            <div className=' w-75 mx-auto mt-4'>

                <form onSubmit={formik.handleSubmit}>

                    {errorsAPIRespone ? <p className=' alert alert-danger my-2'>{errorsAPIRespone}</p> : ''}

                    <h4>Login:</h4>

                    <label htmlFor="email">email:</label>
                    <input className=' form-control' type="email" id="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />

                    {formik.errors.email && formik.touched.email ? <p className=' alert alert-danger my-2'>{formik.errors.email}</p> : ''}


                    <label htmlFor="password">Password:</label>
                    <input className=' form-control' type="password" id="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} />

                    {formik.errors.password && formik.touched.password ? <p className=' alert alert-danger my-2'>{formik.errors.password}</p> : ''}


                    {loading ? <button className='btn form-btn ms-auto d-block my-3'>
                        <i className='fa-solid fa-spinner fa-spin fa-2x text-white'></i>
                    </button>
                        : <button type='submit' disabled={!(formik.isValid && formik.dirty)} className=' btn form-btn text-white my-3 d-block ms-auto'>Login</button>}


                </form>
            </div>
        </>
    )
}

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './Form.css'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const citiesByState = {
    odisha: ["cuttack", "bhubaneswar", "sambalpur", 'raulkela', 'puri'],
    vihar: ["patna", "dhanbad", "nalanda", "gaya", "buxar"],
    punjab: ["ludhiana", "patiala", "mohali", "amritsar", "jalandhar"],
    karnataka: ["bangalore", "mangalore", "mysore", "belgaun", "vijayapura"]
}

const schema = yup
    .object({
        name: yup.string().required(),
        age: yup.number().positive().integer().required(),
        sex: yup.string().required(),
        mobile: yup
            .string()
            .matches(/^[6-9]\d{9}$/, "Please enter a valid Indian mobile number"),
        em_number: yup
            .string()
            .matches(/^[6-9]\d{9}$/, "Please enter a valid Indian mobile number")

    })

function Form() {
    const [touched, setTouched] = useState({});
    const { register, watch, handleSubmit, formState: { errors } } = useForm(
        { resolver: yupResolver(schema) }
    );
    const selectedState = watch("state");
    const cities = citiesByState[selectedState] || [];
    const navigate = useNavigate();

    const handleBlur = (field) => {
        setTouched((prev) => ({ ...prev, [field]: true }));
    };


    const handleFormSubmit = (data) => {
        axios.post('http://localhost:7001/adduser', data)
            .then(response => console.log("response::::", response))
            .catch(error => console.error(error));

        navigate('/table')
    };

    return (
        <>
            <div id='container'>
                <form onSubmit={handleSubmit(handleFormSubmit)}>
                    <h4><u>Personal Details</u></h4>
                    <div className='wrapper'>
                        <div className='name'>
                            <div className='input_feild' style={{ marginBottom: 5 }}>
                                <label htmlFor="name">Name <span>*</span></label>
                                <input type="text" id="name" {...register('name', { required: true })} placeholder='Enter Name' />
                            </div>
                            {errors.name && <span className="error">Please enter your name</span>}
                        </div>
                        <div className='age'>
                            <div className='input_feild' style={{ marginBottom: 5 }}>
                                <label htmlFor="age">Date of birth or age<span>*</span></label>
                                <input type="text" id="age" {...register('age', { required: true })} placeholder='DD/MM/YYYY or Age in Years' />
                            </div>
                            {errors.name && <span className="error">Please enter Date of birth or age</span>}
                        </div>
                        <div className='sex'>
                            <div className='input_feild' style={{ marginBottom: 5 }}>
                                <label htmlFor="sex">Sex<span>*</span></label>
                                <select id='sex' {...register('sex', { required: true })}>
                                    <option value="" disabled selected style={{ color: ' #B3B4B4' }}>Enter Sex</option>
                                    <option value="male">Male</option>
                                    <option value="female">female</option>
                                    <option value="other">other</option>
                                </select>
                            </div>
                            {errors.name && <span className="error">Please enter your gender</span>}
                        </div>
                    </div>
                    <div className='wrapper2'>
                        <div className='mobile'>
                            <div className='input_feild'>
                                <label htmlFor="mobile">Mobile</label>
                                <input type="text" id="mobile" {...register('mobile')} placeholder='Enter Mobile' onBlur={() => handleBlur('mobile')} style={{ width: '56%' }} />
                            </div>
                            {errors.mobile && touched.mobile && <div style={{ color: 'red', marginBottom: 5 }}>{errors.mobile.message}</div>}
                        </div>
                        <div className='govt_id'>
                            <div className='input_feild'>
                                <label htmlFor="govt_id">Govt issued ID</label>
                                <select id='govt_id' {...register('govt_id', { required: true })} style={{ marginLeft: 20 }}>
                                    <option value="" disabled selected style={{ color: ' #B3B4B4' }}>ID Type</option>
                                    <option value="aadhar">Aadhar</option>
                                    <option value="pan">Pan</option>
                                </select>
                                <input type="text" id='idNumber' {...register('idNumber')} placeholder='Enter Govt ID' />
                            </div>

                        </div>
                    </div>
                    <h4><u>Contact Details</u></h4>
                    <div className='wrapper3'>
                        <div className='guardian'>
                            <div className='input_feild'>
                                <label htmlFor="guardian">Guardian Details</label>
                                <select id='guardian' {...register('guardian', { required: true })}>
                                    <option value="" disabled selected style={{ color: ' #B3B4B4' }}>Enter Label</option>
                                    <option value="father">Father</option>
                                    <option value="mother">Mother</option>
                                    <option value="parents">Parents</option>
                                </select>
                                <input type="text" id='guardian_name' {...register('guardian_name')} placeholder='Enter Gurdians Name' />
                            </div>
                        </div>
                        <div className='email'>
                            <div className='input_feild'>
                                <label htmlFor="email">Email</label>
                                <input type="email" id="email" {...register('email')} placeholder='Enter Email' />
                            </div>
                        </div>
                        <div className='em_number'>
                            <div className='input_feild'>
                                <label htmlFor="em_number">Emergency Contact Number</label>
                                <input type="text" id="em_number" {...register('em_number')} placeholder='Enter Emergency Number' onBlur={() => handleBlur('em_number')} />
                            </div>
                            {errors.em_number && touched.em_number && <div style={{ color: 'red', marginBottom: 5 }}>{errors.em_number.message}</div>}
                        </div>
                    </div>
                    <h4><u>Address Details</u></h4>
                    <div className="wrapper4">
                        <div className='address'>
                            <div className='input_feild'>
                                <label htmlFor="address">Address</label>
                                <input type="text" id="address" {...register('address')} placeholder='Enter Address' />
                            </div>
                        </div>
                        <div className='state'>
                            <div className='input_feild'>
                                <label htmlFor="state">State</label>
                                <select id='state' {...register('state')}>
                                    <option value="" disabled selected style={{ color: ' #B3B4B4' }}>Enter State</option>
                                    <option value="odisha">Odisha</option>
                                    <option value="vihar">Vihar</option>
                                    <option value="punjab">Punjab</option>
                                    <option value="karnataka">Karnataka</option>
                                </select>
                            </div>
                        </div>
                        <div className='city'>
                            <div className='input_feild'>
                                <label htmlFor="city">City</label>
                                <select id='city' {...register('city')}>
                                    <option value="" disabled selected style={{ color: ' #B3B4B4' }}>Enter city/town/village</option>
                                    {cities.map((city) => (
                                        <option key={city} value={city}>
                                            {city}
                                        </option>
                                    ))}
                                </select>
                            </div>

                        </div>
                    </div>
                    <div>
                        <div className='wrapper5'>
                            <label htmlFor="country">Country</label>
                            <input
                                type="text"
                                name="country"
                                id="country"
                                value="India"
                                {...register("country")}
                            />
                            <label htmlFor="pincode" style={{ marginLeft: "10rem" }}>Pincode</label>
                            <input
                                type="number"
                                placeholder="Enter Pincode"
                                id="pincode"
                                {...register("pincode")}
                            />
                        </div>
                        <h4><u>Other Details</u></h4>

                        <div className='wrapper6'>
                            <label htmlFor="occupation">Occupation</label>
                            <input
                                type="occupation"
                                placeholder="Enter occupation"
                                id="occupation"
                                {...register("occupation")}
                            />
                            <label htmlFor="religion">Religion</label>
                            <select name="religion" id="religion" {...register("religion")} style={{ width: "27%" }}>
                                <option value="">Enter religion</option>
                                <option value="hindu">Hindu</option>
                                <option value="muslim">Muslim</option>
                                <option value="christian">Christian</option>
                            </select>
                            <label htmlFor="maritialStatus" style={{ marginLeft: '45px' }}>Maritial Status</label>
                            <select
                                name="maritialStatus"
                                id="maritialStatus"
                                {...register("maritialStatus")}
                            >
                                <option value="">Enter maritial status</option>
                                <option value="married">Married</option>
                                <option value="unmarried">Un-married</option>
                                <option value="divorcee">Divorcee</option>
                            </select>
                            <label htmlFor="bloodGroup" style={{ marginLeft: '45px' }}>Blood Group</label>
                            <select
                                name="bloodGroup"
                                id="bloodGroup"
                                {...register("bloodGroup")}
                            >
                                <option value="">Group</option>
                                <option value="A+">A+</option>
                                <option value="B+">B+</option>
                                <option value="A-">A-</option>
                                <option value="B-">B-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="nationality" style={{ marginRight: '20px' }}>Nationality</label>
                            <input
                                type="text"
                                name="nationality"
                                id="nationality"
                                value="indian"
                                {...register("nationality")}
                            />
                        </div>
                    </div>
                    <div className='btn-group'>
                        <button type='reset' id='cancle'>CANCLE</button>
                        <button type="submit" id='submit'>SUBMIT</button>
                    </div>
                </form >
            </div >
        </>
    );
}

export default Form;

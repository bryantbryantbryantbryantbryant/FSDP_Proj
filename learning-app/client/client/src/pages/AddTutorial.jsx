import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, Select, MenuItem } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import http from '../http';

function AddTutorial() {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            discounts: "",
            remarks: ""
        },
        validationSchema: yup.object().shape({
            discounts: yup.string()
                .matches(/^(10%|20%|30%|40%|100%)$/, 'Discount must be one of the following: 10%, 20%, 30%, 40%, 100%')
                
                .required('Discount is required'),
            remarks: yup.string().trim()
                .min(3, 'Remarks must be at least 3 characters')
                .max(500, 'Remarks must be at most 500 characters'),
        }),
        onSubmit: (data) => {

            data.couponCode = Math.random().toString(36).substring(7);
            data.remarks = data.remarks.trim();
            http.post("/tutorial", data)
                .then((res) => {
                    console.log(res.data);
                    navigate("/tutorials");
                });
        }
    });

    return (
        <Box>
            <Typography variant="h5" sx={{ my: 2 }}>
                Add Coupons
            </Typography>
            <Box component="form" onSubmit={formik.handleSubmit}>
                <Select
                    fullWidth margin="normal"
                    label="Discounts"
                    name="discounts"
                    value={formik.values.discounts}
                    onChange={formik.handleChange}
                    error={formik.touched.discounts && Boolean(formik.errors.discounts)}
                    helperText={formik.touched.discounts && formik.errors.discounts}
                >
                    <MenuItem value="10%">10%</MenuItem>
                    <MenuItem value="20%">20%</MenuItem>
                    <MenuItem value="30%">30%</MenuItem>
                    <MenuItem value="40%">40%</MenuItem>
                    <MenuItem value="100%">100%</MenuItem>
                </Select>
                <TextField
                    fullWidth margin="normal" autoComplete="off"
                    multiline minRows={2}
                    label="Remarks"
                    name="remarks"
                    value={formik.values.remarks}
                    onChange={formik.handleChange}
                    error={formik.touched.remarks && Boolean(formik.errors.remarks)}
                    helperText={formik.touched.remarks && formik.errors.remarks}
                />
                <Box sx={{ mt: 2 }}>

                    <Button variant="contained" type="submit">
                        Add
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default AddTutorial;
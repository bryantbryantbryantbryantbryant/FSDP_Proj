import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, Select, MenuItem, FormControlLabel, Checkbox } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import http from '../http';
import { useFormik } from 'formik';
import * as yup from 'yup';

function EditTutorial() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [tutorial, setTutorial] = useState({
        couponCode: "",
        discounts: "",
        remarks: "",
        isRedeemed: false
    });

    useEffect(() => {
        http.get(`/tutorial/${id}`).then((res) => {
            setTutorial(res.data);
        });
    }, []);

    const formik = useFormik({
        initialValues: tutorial,
        enableReinitialize: true,
        validationSchema: yup.object().shape({
            couponCode: yup.string().trim()
                .min(3, 'Coupon code must be at least 3 characters')
                .max(100, 'Coupon code must be at most 100 characters')
                .required('Coupon code is required'),
            discounts: yup.string().trim()
                .matches(/^(10%|20%|30%|40%|100%)$/, 'Discount must be one of the following: 10%, 20%, 30%, 40%, 100%')
                .required('Discount is required'),
            remarks: yup.string().trim()
                .min(3, 'Remarks must be at least 3 characters')
                .max(500, 'Remarks must be at most 500 characters'),
            isRedeemed: yup.boolean()
        }),
        onSubmit: (data) => {
            data.couponCode = data.couponCode.trim();
            data.discounts = data.discounts.trim();
            data.remarks = data.remarks.trim();
            http.put(`/tutorial/${id}`, data)
                .then((res) => {
                    console.log(res.data);
                    navigate("/tutorials");
                });
        }
    });

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteTutorial = () => {
        http.delete(`/tutorial/${id}`)
            .then((res) => {
                console.log(res.data);
                navigate("/tutorials");
            });
    }

    return (
        <Box>
            <Typography variant="h5" sx={{ my: 2 }}>
                Edit Coupon
            </Typography>
            <Box component="form" onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth margin="normal" autoComplete="off"
                    label="Coupon Code"
                    name="couponCode"
                    value={formik.values.couponCode}
                    onChange={formik.handleChange}
                    error={formik.touched.couponCode && Boolean(formik.errors.couponCode)}
                    helperText={formik.touched.couponCode && formik.errors.couponCode}
                />
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
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={formik.values.isRedeemed}
                            onChange={formik.handleChange}
                            name="isRedeemed"
                            color="primary"
                        />
                    }
                    label="Is Redeemed"
                />
                <Box sx={{ mt: 2 }}>
                    <Button variant="contained" type="submit">
                        Update
                    </Button>
                    <Button variant="contained" sx={{ ml: 2 }} color="error" onClick={handleOpen}>
                        Delete
                    </Button>
                </Box>
            </Box>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    Delete Coupon
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this coupon?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="inherit" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="error" onClick={deleteTutorial}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default EditTutorial;
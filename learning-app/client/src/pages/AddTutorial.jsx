import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import http from '../http';

function AddTutorial() {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            area: "",
            location: "",
            stationid: "",
            status: ""
        },
        validationSchema: yup.object().shape({
            area: yup.string().trim()
                .oneOf(["North", "South", "East", "West"], 'Please choose 1 of the options')
                .required('Area is required'),
            location: yup.string().trim()
                .min(3, 'Location must be at least 3 characters')
                .max(500, 'Location must be at most 500 characters')
                .required('Location is required'),
            stationid: yup.string().trim()
                .min(3, 'StationID must be at least 3 characters')
                .max(500, 'StationID must be at most 500 characters')
                .required('StationID is required'),
            status: yup.string().trim()
                .oneOf(['Online', 'Offline'], 'Please choose 1 of the options')
                .required('Status is required')
        }),
        onSubmit: (data) => {
            data.area = data.area.trim();
            data.location = data.location.trim();
            data.stationid = data.stationid.trim();
            data.status = data.status.trim();
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
                Add Charging Station
            </Typography>
            <Box component="form" onSubmit={formik.handleSubmit}>
                <Typography variant="h6" sx={{ my: 1 }}>
                    Area
                </Typography>
                <RadioGroup
                    name="area"
                    value={formik.values.area}
                    onChange={formik.handleChange}
                >
                    <FormControlLabel value="North" control={<Radio />} label="North" />
                    <FormControlLabel value="South" control={<Radio />} label="South" />
                    <FormControlLabel value="East" control={<Radio />} label="East" />
                    <FormControlLabel value="West" control={<Radio />} label="West" />
                </RadioGroup>
                {formik.touched.area && formik.errors.area && (
                    <Typography variant="body2" color="error">
                        {formik.errors.area}
                    </Typography>
                )}
                <TextField
                    fullWidth margin="normal" autoComplete="off"
                    multiline minRows={2}
                    label="Location"
                    name="location"
                    value={formik.values.location}
                    onChange={formik.handleChange}
                    error={formik.touched.location && Boolean(formik.errors.location)}
                    helperText={formik.touched.location && formik.errors.location}
                />
                <TextField
                    fullWidth margin="normal" autoComplete="off"
                    label="StationID"
                    name="stationid"
                    value={formik.values.stationid}
                    onChange={formik.handleChange}
                    error={formik.touched.stationid && Boolean(formik.errors.stationid)}
                    helperText={formik.touched.stationid && formik.errors.stationid}
                />
                <Typography variant="h6" sx={{ my: 1 }}>
                    Status
                </Typography>
                <RadioGroup
                    name="status"
                    value={formik.values.status}
                    onChange={formik.handleChange}
                >
                    <FormControlLabel value="Online" control={<Radio />} label="Online" />
                    <FormControlLabel value="Offline" control={<Radio />} label="Offline" />
                </RadioGroup>
                {formik.touched.status && formik.errors.status && (
                    <Typography variant="body2" color="error">
                        {formik.errors.status}
                    </Typography>
                )}
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
import { Box, Container, Grid, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
type TDoctor = {
  id: string;
  email: string;
  name: string;
  profilePhoto: string;
  contactNumber: string;
  address: string;
  registrationNumber: string;
  experience: number;
  gender: string;
  apointmentFee: number;
  qualification: string;
  currentWorkingPlace: string;
  designation: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  averageRating: number;
  review: any[];
  doctorSpecialties: any[];
};
const TopRatedDoctors = async () => {
  const res = await fetch(`${process.env.SERVER_URL}/doctor`);
  const doctors = await res.json();

  return (
    <Box
      sx={{
        my: 10,
        py: 30,
        backgroundColor: "rgba(20, 20, 20, 0.1)",
        clipPath: "Polygon(0% 0%, 100% 20%, 100% 100%, 0% 80%)",
      }}
    >
      <Container>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h4" component="h1" fontWeight={700}>
            Our Top Rated Doctors
          </Typography>
          <Typography
            component="p"
            fontSize={18}
            fontWeight={400}
            sx={{ mt: 2 }}
          >
            Access to expert physicians and surgeons, advanced technologies
          </Typography>
          <Typography component="p" fontSize={18} fontWeight={400}>
            and top-quality surgery facilities right here.
          </Typography>
        </Box>
        <Grid container gap={3} mt={4}>
          {doctors.data.map((doctor: TDoctor) => (
            <Card key={doctor.id} sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                alt="green iguana"
                height="10"
                image={doctor.profilePhoto}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  fontWeight={600}
                >
                  {doctor.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {doctor.qualification}, {doctor.designation}
                </Typography>
                <Typography variant="body2" mt={1} color="text.secondary">
                  <LocationOnIcon />
                  {doctor.address}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "space-between", padding: 2 }}>
                <Button>Book Now</Button>
                <Button variant="outlined">View Profile</Button>
              </CardActions>
            </Card>
          ))}
        </Grid>
        <Box
          sx={{
            textAlign: "center",
          }}
        >
          <Button
            variant="outlined"
            sx={{
              marginTop: "20px",
            }}
          >
            View ALL
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default TopRatedDoctors;

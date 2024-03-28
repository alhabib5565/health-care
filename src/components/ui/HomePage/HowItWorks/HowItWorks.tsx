import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import femaleDocImg from "@/assets/how-it-works-img.png";
import searchIcon from "@/assets/icons/search-icon.png";
import doctorIcon from "@/assets/icons/doctor-icon.png";
import appointmentIcon from "@/assets/icons/appointment-icon.png";
import charityIcon from "@/assets/icons/charity-icon.png";
import Image, { StaticImageData } from "next/image";

const HowItWorks = () => {
  return (
    <Container>
      <Box>
        <Typography color="primary.main" component="h6" variant="h6">
          How It Works
        </Typography>
        <Typography fontWeight={600} component="h4" variant="h4" my={1}>
          4 Easy Steps to Get Your Solution
        </Typography>
        <Typography component="p" fontSize={18} fontWeight={400}>
          Access to expert physicians and surgeons, advanced technologies
        </Typography>
      </Box>
      <Stack direction="row" gap={2} my={10}>
        <Box sx={{ flex: 1 }}>
          <Image src={femaleDocImg} alt="how it works image" />
        </Box>
        <Box sx={{ flex: 1 }}>
          <Grid container spacing={2}>
            <ServiceBox title=" Search Doctor" image={searchIcon} />
            <ServiceBox title=" Check Doctor Profile" image={doctorIcon} />
            <ServiceBox title=" Schedule Appointment" image={appointmentIcon} />
            <ServiceBox title="  Get Your Solution" image={charityIcon} />
          </Grid>
        </Box>
      </Stack>
    </Container>
  );
};

export default HowItWorks;

type TServiceBoxProps = {
  title: string;
  image: StaticImageData;
};
const ServiceBox = ({ title, image }: TServiceBoxProps) => {
  return (
    <Grid item xs={6}>
      <Box
        sx={{
          borderRadius: 2,
          padding: 2,
          border: "1px solid lightgray",
          // bgcolor: "lightgray",
        }}
      >
        <Box>
          <Image src={image} alt="" width={50} />
        </Box>
        <Typography variant="h6" fontSize={22} mt={3} mb={1} component="h6">
          {title}
        </Typography>
        <Typography
          variant="body1"
          component="p"
          fontSize={15}
          fontWeight={300}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, odit.
        </Typography>
      </Box>
    </Grid>
  );
};

import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import assets from "@/assets";

const HeroSection = () => {
  return (
    <Container sx={{ my: 16 }}>
      <Stack direction="row" spacing={3}>
        <Box sx={{ position: "relative", width: "50%" }}>
          <Box
            sx={{
              width: "700px",
              position: "absolute",
              top: "-120px",
              left: "-90px",
            }}
          >
            <Image src={assets.svgs.grid} alt="grid image" />
          </Box>
          <Typography variant="h2" component="h1" fontWeight={600}>
            Healthier Hearts
          </Typography>
          <Typography variant="h2" component="h1" fontWeight={600}>
            Come From
          </Typography>
          <Typography
            variant="h2"
            component="h1"
            fontWeight={600}
            color="primary.main"
          >
            Preventive Care
          </Typography>
          <Typography component="p" variant="subtitle1" my={4}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit eum
            iusto consequatur eius, doloribus nesciunt facere aliquid eveniet
            et. Rerum maiores saepe cupiditate repellat recusandae atque sed.
            Saepe, vitae id?
          </Typography>
          <Stack direction="row" spacing={3}>
            <Button>Make Appointment</Button>{" "}
            <Button variant="outlined">Contact Us</Button>
          </Stack>
        </Box>
        <Box sx={{ position: "relative", flex: 1 }}>
          <Box sx={{ position: "absolute", top: "-40px", left: "180px" }}>
            <Image
              src={assets.svgs.arrow}
              alt="arrow image"
              width={100}
              height={100}
            />
          </Box>
          <Stack direction="row" spacing={2}>
            <Box pt={4}>
              <Image
                width={250}
                height={350}
                src={assets.images.doctor1}
                alt="doctor one"
              />
            </Box>
            <Box>
              <Image
                width={250}
                height={300}
                src={assets.images.doctor2}
                alt="doctor tow"
              />
            </Box>
          </Stack>
          <Box sx={{ position: "absolute", bottom: "-40px", left: "120px" }}>
            <Image
              width={250}
              height={250}
              src={assets.images.doctor3}
              alt="doctor three"
            />
          </Box>
          <Box
            sx={{
              position: "absolute",
              bottom: "-100px",
              right: "-40px",
              zIndex: -1,
            }}
          >
            <Image
              width={250}
              height={250}
              src={assets.images.stethoscope}
              alt="doctor three"
            />
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default HeroSection;

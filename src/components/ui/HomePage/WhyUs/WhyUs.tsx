import assets from "@/assets";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import chooseUs from "../../../../assets/choose-us.png";
const servicesData = [
  {
    imageSrc: assets.svgs.award,
    title: "Award Winning Service",
    description:
      "Duas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui offici",
  },
  {
    imageSrc: assets.svgs.care,
    title: "Best Quality Pregnancy Care",
    description:
      "Duas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui offici",
  },
  {
    imageSrc: assets.svgs.equipment,
    title: "Complete Medical Equipments",
    description:
      "Duas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui offici",
  },
  {
    imageSrc: assets.svgs.call,
    title: "Dedicated Emergency Care",
    description:
      "Duas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui offici",
  },
];

const WhyUs = () => {
  return (
    <Container>
      <Box textAlign="center">
        <Typography color="primary.main" component="h6" variant="h6">
          Why Us
        </Typography>
        <Typography fontWeight={600} component="h4" variant="h4">
          Why Choose Us
        </Typography>
      </Box>
      <Grid container spacing={2} my={5}>
        <Grid item md={6}>
          {servicesData.map((data, index) => (
            <Stack
              className={`rounded-s-md ${
                index % 2 === 0 ? "rounded-br-[100px]" : "rounded-tr-[100px]"
              }`}
              key={index}
              direction="row"
              justifyItems="center"
              gap={2}
              sx={{
                backgroundColor: "rgba(245, 245, 245,1)",
                padding: 2,
                mb: 2,
                // borderRadius: "15px 0px 0px 15px",
              }}
            >
              <Box sx={{ bgcolor: "#fff", padding: 2, borderRadius: 2 }}>
                <Image
                  width={50}
                  height={50}
                  src={data.imageSrc}
                  alt="awward image"
                  className="w-[50px] h-[50px]"
                />
              </Box>
              <Box>
                <Typography component="h5" variant="h5" pb={1} fontWeight={600}>
                  {data.title}
                </Typography>
                <Typography component="p" variant="body1" fontWeight={300}>
                  {data.title}
                </Typography>
              </Box>
            </Stack>
          ))}
        </Grid>
        <Grid item md={6}>
          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <Image width={400} src={chooseUs} alt="choose png" />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default WhyUs;

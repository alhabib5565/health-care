import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

const Specialist = async () => {
  const res = await fetch(`${process.env.SERVER_URL}/specialties`, {
    next: {
      revalidate: 30,
    },
  });
  const specialties = await res.json();

  return (
    <Container>
      <Box py={10}>
        <Typography variant="h4" component="h4" fontWeight={600}>
          Explore Treatments Across Specialties
        </Typography>
        <Typography component="p" fontWeight={300} fontSize={18} mt={1}>
          Experienced Doctors Across All Specialties
        </Typography>

        <Stack direction="row" spacing={3} mt={4}>
          {specialties.data.map((item: any) => (
            <Box
              sx={{
                padding: "30px 10px",
                backgroundColor: "rgba(245, 245, 245,1)",
                border: "1px solid rgba(255, 255, 255, 1)",
                textAlign: "center",
                borderRadius: "10px",
                "& img": {
                  margin: "0 auto",
                  width: "50px",
                  height: "50px",
                },
                "&:hover": {
                  border: "1px solid rgba(36, 153, 239, 1)",
                  borderRadius: "10px",
                  cursor: "pointer",
                  transition: "all 0.5s",
                },
              }}
              flex={1}
              key={item.id}
            >
              <Image
                width={100}
                height={100}
                src={item.icon}
                alt="specialty image"
              />
              <Typography
                variant="h4"
                component="h4"
                fontWeight={500}
                fontSize={18}
                mt={2}
              >
                {item.title}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>
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
  );
};

export default Specialist;

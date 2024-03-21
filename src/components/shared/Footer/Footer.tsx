import { Box, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import facebookIcon from "../../../assets/landing_page/facebook.png";
import twitterIcon from "../../../assets/landing_page/twitter.png";
import instagramIcon from "../../../assets/landing_page/instagram.png";
import linkedinIcon from "../../../assets/landing_page/linkedin.png";
const Footer = () => {
  return (
    <Box bgcolor="#000" py={8}>
      <Container>
        <Stack mb={4} direction="row" spacing={2} justifyContent="center">
          {/* <Typography component={Link} href="/" variant="h4" fontWeight={700}>
            P
            <Box component="span" color="primary.main">
              H
            </Box>{" "}
            Health Care
          </Typography> */}
          <Typography color="#fff" component={Link} href="/consultation">
            Consultation
          </Typography>
          <Typography color="#fff" component={Link} href="/healthPlans">
            Health Plans
          </Typography>
          <Typography color="#fff" component={Link} href="/medicine">
            Medicine
          </Typography>
          <Typography color="#fff" component={Link} href="/diagnostics">
            Diagnostics
          </Typography>
          <Typography color="#fff" component={Link} href="/ngos">
            NGOs
          </Typography>
        </Stack>
        <Stack mb={4} direction="row" spacing={2} justifyContent="center">
          <Image src={facebookIcon} height={30} width={30} alt="facebook" />
          <Image src={twitterIcon} height={30} width={30} alt="twitter" />
          <Image src={linkedinIcon} height={30} width={30} alt="linkedin" />
          <Image src={instagramIcon} height={30} width={30} alt="instagram" />
        </Stack>
        <div className="border border-dashed mb-6"></div>
        <Stack
          direction="row"
          gap={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography component="p" color="white">
            &copy;2024 Ph HealthCare. All Rights Reserved.
          </Typography>
          <Typography
            variant="h4"
            component={Link}
            href="/"
            fontWeight={600}
            color="white"
          >
            P
            <Box component="span" color="primary.main">
              H
            </Box>{" "}
            Health Care
          </Typography>
          <Typography component="p" color="white">
            Privacy Policy! Terms & Conditions
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer;

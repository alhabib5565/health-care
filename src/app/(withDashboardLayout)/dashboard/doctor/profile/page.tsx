"use client";
import AutoFileUploader from "@/components/ui/Form/AutoFileUploader";
import {
  useGetMYProfileQuery,
  useUpdateMYProfileMutation,
} from "@/redux/api/myProfile.api";
import { Box, Button, Grid, styled } from "@mui/material";
import Image from "next/image";
import ProfileInfo from "./components/ProfileInfo";
import ProfileUpdateModal from "./components/PfrofileUpdateModal";
import { useState } from "react";

const DoctorProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading } = useGetMYProfileQuery({});

  const [updateProfilePhoto, { isLoading: updating }] =
    useUpdateMYProfileMutation();

  const fileUploadHandler = (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("data", JSON.stringify({}));

    updateProfilePhoto(formData);
  };

  if (isLoading) {
    <p>Loading...</p>;
  }
  return (
    <Box>
      <ProfileUpdateModal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        id={data?.id}
      />
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              height: 300,
              width: "100%",
              overflow: "hidden",
              borderRadius: 1,
            }}
          >
            <Image
              style={{ width: "100%" }}
              height={300}
              width={400}
              src={data?.profilePhoto}
              alt="profile photo"
            />
          </Box>
          <Box my={3}>
            {updating ? (
              <p>Uploading...</p>
            ) : (
              <AutoFileUploader
                name="file"
                label="Choose Your Profile Photo"
                // icon={<CloudUploadIcon />}
                onFileUpload={fileUploadHandler}
                // variant="text"
              />
            )}
          </Box>
          <Button
            fullWidth
            // endIcon={<ModeEdin />}
            onClick={() => setIsModalOpen(true)}
          >
            Edit Profile
          </Button>
        </Grid>

        <Grid item xs={12} md={8}>
          <ProfileInfo data={data} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DoctorProfile;

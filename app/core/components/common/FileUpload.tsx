import styled from "@emotion/styled"
import { PhotoCamera } from "@mui/icons-material"
import { Stack, Button, IconButton } from "@mui/material"
import React from "react"
import Image from "next/image"

const Input = styled("input")({
  display: "none",
})

export default function FileUpload({ onChange, previewImage }) {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <label htmlFor="contained-button-file">
        <Input
          accept="image/*"
          placeholder="File Name"
          id="contained-button-file"
          multiple
          type="file"
          onChange={onChange}
        />
        <Button variant="contained" component="span">
          Select Image
        </Button>
      </label>
      <label htmlFor="icon-button-file">
        <Input
          accept="image/*"
          placeholder="File Name"
          id="contained-button-file"
          multiple
          type="file"
          onChange={onChange}
        />
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label>
      <div
        style={{
          border: "1px dashed black",
          position: "relative",
          width: "576px",
          height: "648px",
        }}
      >
        {previewImage && (
          <Image src={previewImage} alt={"Preview"} layout={"fill"} objectFit={"contain"} />
        )}
      </div>
    </Stack>
  )
}

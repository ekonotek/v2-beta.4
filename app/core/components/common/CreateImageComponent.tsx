import { FORM_ERROR, ImageForm } from "app/images/components/ImageForm"
import React from "react"
import Image from "next/image"
import { ChangeEvent, useState } from "react"
import signS3 from "app/images/mutations/signS3"
import DateFnsAdapter from "@date-io/date-fns"
import axios from "axios"
import { useMutation } from "@blitzjs/rpc"
import createImage from "app/images/mutations/createImage"
import format from "date-fns/format"
import FileUpload from "./FileUpload"
const dateFns = new DateFnsAdapter()

export const formatFilename = (filename: String, folder: String) => {
  console.log("filename==============")
  console.log(filename)
  const date = format(dateFns.date(), "yyyMMdd")
  const randomString = Math.random().toString(36).substring(2, 7)
  const cleanFileName = filename.toLowerCase().replace(/[^a-z0-9]/g, "-")
  console.log("cleanFileName.............")
  console.log(cleanFileName)
  const newFilename = `${folder}/${date}-${randomString}-${cleanFileName}`

  // console.log(newFilename)
  return newFilename.substring(0, 60)
}

export const uploadToS3 = async (file, fileType, signedRequest) => {
  const options = {
    headers: {
      "Content-Type": fileType,
    },
  }
  await axios.put(signedRequest, file, options)
}

export function CreateImageComponent() {
  const [previewImage, setPreviewImage] = useState<string>()
  const [fileName, setFileName] = useState("")
  // const [showAddButton, setShowAddButton] = useState(false)
  const [createImageMutation] = useMutation(createImage)
  const [signS3Mutation] = useMutation(signS3)

  const [elNameFile, setelNameFile] = useState("")
  const [elFileType, setelFileType] = useState(" ")
  const [elFile, setelFile] = useState()

  const imageChange = (e) => {
    alert(e.currentTarget.value)
    // console.log("e.currentTarget.files: ")
    // console.log(typeof e.currentTarget.files)
    // console.log(e.currentTarget.files)
    // console.log(e.currentTarget.files["length"])

    const completeFileName = e.currentTarget.value.split("\\").pop()
    alert(completeFileName)
    setelNameFile(completeFileName)
    setelFileType(completeFileName.split(".").pop())

    alert(elNameFile)
    alert(elFileType)
    setelFile(e.currentTarget.files[0])

    if (e.currentTarget.files && e.currentTarget.files["lenght"] > 0) {
      // SelectedImage(e.tasrget.files(0))
      alert(e.currentTarget.files[0])
    }
  }

  const onImageChange = async (e) => {
    alert(e.currentTarget.value)
    // console.log("e.currentTarget.files: ")
    // console.log(typeof e.currentTarget.files)
    // console.log(e.currentTarget.files)
    // console.log(e.currentTarget.files["length"])
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewImage(reader.result as string)
    }
    reader.readAsDataURL(e.currentTarget.files[0])

    const completeFileName = e.currentTarget.value.split("\\").pop()
    alert(completeFileName)
    setelNameFile(completeFileName)
    setelFileType(completeFileName.split(".").pop())
    setelFile(e.currentTarget.files[0])

    if (e.currentTarget.files && e.currentTarget.files["lenght"] > 0) {
      // SelectedImage(e.tasrget.files(0))
      alert(e.currentTarget.files[0])
    }
  }

  return (
    <React.Fragment>
      <h1>Create New Image</h1>
      {/* <div className="mt-4">
        <label
          htmlFor="image"
          className="p-4 border-dashed border-4 border-gray-600 block cursor-pointer"
        >
          Click to add image (16:9)
        </label>
        <input
          id="image"
          name="file"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          // ref={register({
          //   validate: (fileList: FileList) => {
          //     if (house || fileList.length === 1) return true
          //     return "Please upload one file"
          //   },
          // })}
          onChange={async (event: ChangeEvent<HTMLInputElement>) => {
            if (event?.target?.files?.[0]) {
              const file = event.target.files[0]
              const reader = new FileReader()
              reader.onloadend = () => {
                setPreviewImage(reader.result as string)
              }
              reader.readAsDataURL(file)
              await imageChange(event)
              console.log("elNameFile_______________________")
              console.log(elNameFile)
              const formattedNameFile = formatFilename(elNameFile, "images")
              const response = await signS3Mutation({
                fileName: formattedNameFile,
                fileType: elFileType,
              })

              // console.log("response...............")
              // console.log(response)
              const { signedRequest, url } = response
              // uploadToS3(elFile, elFileType, signedRequest)
              setelNameFile(url)
            }
          }}
          // defaultdefaultValue={""}
        />
      </div>

      <div style={{ position: "relative", width: "576px", height: "648px" }}>
        {previewImage && (
          <Image src={previewImage} alt={"Preview"} layout={"fill"} objectFit={"contain"} />
        )}
      </div> */}
      <FileUpload onChange={onImageChange} previewImage={previewImage} />
      <ImageForm
        submitText="Upload Image"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateImage}
        // initialValues={{ name: "", nameFile: "" }}
        onSubmit={async (values) => {
          try {
            const formattedNameFile = formatFilename(elNameFile, "images")
            const response = await signS3Mutation({
              fileName: formattedNameFile,
              fileType: elFileType,
            })

            console.log("response...............")
            console.log(response)
            const { signedRequest, url } = response
            uploadToS3(elFile, elFileType, signedRequest)
            // setelNameFile(url)
            values.nameFile = url
            values.caption = elNameFile.split(".")[0]
            values.description = elNameFile.split(".")[0]
            values.type = elFileType
            console.log("VALUES-----------")
            console.log(values)
            const image = await createImageMutation(values)
            // router.push(Routes.ShowImagePage({ imageId: image.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />
    </React.Fragment>
  )
}

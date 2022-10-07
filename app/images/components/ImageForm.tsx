import { Form, FormProps } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
import { z } from "zod"
import Image from "next/image"
import { ChangeEvent, useState } from "react"
export { FORM_ERROR } from "app/core/components/Form"

export function ImageForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  const [previewImage, setPreviewImage] = useState<string>()
  return (
    <Form<S> {...props}>
      <>
        <div className="mt-4">
          <label
            htmlFor="image"
            className="p-4 border-dashed border-4 border-gray-600 block cursor-pointer"
          >
            Click to add image (16:9)
          </label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            // ref={register({
            //   validate: (fileList: FileList) => {
            //     if (house || fileList.length === 1) return true
            //     return "Please upload one file"
            //   },
            // })}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              if (event?.target?.files?.[0]) {
                const file = event.target.files[0]
                const reader = new FileReader()
                reader.onloadend = () => {
                  setPreviewImage(reader.result as string)
                }
                reader.readAsDataURL(file)
              }
            }}
          />
          <div style={{ position: "relative", width: "576px", height: "648px" }}>
            {previewImage ? (
              <Image src={previewImage} alt={"Preview"} layout={"fill"} objectFit={"contain"} />
            ) : props.initialValues?.nameFile ? (
              <Image
                src={props.initialValues.nameFile}
                alt={props.initialValues.caption}
                layout={"fill"}
                objectFit={"contain"}
              />
            ) : null}
          </div>
        </div>
      </>
      <LabeledTextField name="name" label="Name" placeholder="Name" />
    </Form>
  )
}

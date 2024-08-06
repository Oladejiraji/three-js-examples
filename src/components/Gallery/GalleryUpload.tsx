import React, { ChangeEvent, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import getUuidByString from "uuid-by-string";
import Image from "next/image";
import { toast } from "react-toastify";
import { storage } from "../../../firebaseconfig";

const GalleryUpload = ({
  changeFiles,
}: {
  changeFiles: (url: string[]) => void;
}) => {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    if (event.target.files.length === 0) return;
    if (event.target.files?.length > 8) {
      toast("You can only add up to 8 images!");
      return;
    }
    setLoading(true);
    const promises: Promise<string>[] = [];

    [...event.target.files].forEach((sing) => {
      const file = sing;
      const storageRef = ref(storage, `files/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      promises.push(
        new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setProgress(progress);
            },
            (error) => {
              console.error(error);
              reject(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                // changeFiles(downloadURL);
                resolve(downloadURL);
              });
            }
          );
        })
      );
    });

    Promise.all(promises)
      .then((urls) => {
        setLoading(false);
        changeFiles(urls);
      })
      .catch((error) => {
        console.error("Failed to upload files", error);
        setLoading(false);
      });
  };
  return (
    <div className="h-full w-full items-center justify-center flex">
      {loading ? (
        <div className="flex flex-col items-center justify-center">
          <h1 className="pb-2">Uploading Images</h1>
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <div className="flex items-center">
            <label
              htmlFor="file-upload"
              className="border-[1px] border-primary-50 w-[183px] h-[36px] flex items-center justify-center cursor-pointer bg-transparent rounded-[4px] "
            >
              <p className="text-[15px] font-bold text-primary-50 ">
                Upload Images
              </p>
            </label>
            <input
              id="file-upload"
              className="hidden"
              accept={["image/jpeg", "image/png", "image/jpg"].join(",")}
              type="file"
              multiple
              onChange={handleChange}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default GalleryUpload;

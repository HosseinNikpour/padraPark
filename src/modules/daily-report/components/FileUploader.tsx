"use client";

import { useDropzone } from "react-dropzone";
import { UploadCloud } from "lucide-react";

interface Props {
  onFileSelected(file: File): void;
}

export default function FileUploader({
  onFileSelected,
}: Props) {
  const { getRootProps, getInputProps } =
    useDropzone({
      accept: {
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
          [".xlsx"],
      },
      multiple: false,
      onDrop(files) {
        if (files.length) {
          onFileSelected(files[0]);
        }
      },
    });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed rounded-xl p-10 cursor-pointer hover:border-blue-500 transition"
    >
      <input {...getInputProps()} />

      <div className="flex flex-col items-center gap-4">

        <UploadCloud size={48} />

        <div className="text-lg">
          فایل اکسل را انتخاب کنید
        </div>

        <div className="text-sm text-gray-500">
          یا Drag & Drop
        </div>

      </div>
    </div>
  );
}
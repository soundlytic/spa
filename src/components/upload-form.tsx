'use client';

import { upload } from '@/api/song';
import { Dropzone, DropzoneContent, DropzoneEmptyState } from '@/components/ui/shadcn-io/dropzone';
import { useState } from 'react';

export default function UploadForm() {
  const [files, setFiles] = useState<File[] | undefined>();

  const handleDrop = async(files: File[]) => {
    setFiles(files);

    for (const file of files) {
      await upload(file);
    }
  };

  return (
    <Dropzone
      accept={{
        "audio/*": []
      }}
      maxFiles={10}
      maxSize={1024 * 1024 * 100}
      minSize={1024}
      onDrop={handleDrop}
      onError={console.error}
      src={files}
    >
      <DropzoneEmptyState />
      <DropzoneContent />
    </Dropzone>
  );
}

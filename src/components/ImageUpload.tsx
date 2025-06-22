import { useFormContext, Controller } from 'react-hook-form';
import { Icon } from '@iconify/react';
import { useState, useCallback } from 'react';

interface ImageUploadProps {
  name: string;
}

export const ImageUpload = ({ name }: ImageUploadProps) => {
  const { control, watch, setValue } = useFormContext();
  const [isDragging, setIsDragging] = useState(false);
  
  const currentImage = watch(name);
  const [preview, setPreview] = useState<string | null>(
    typeof currentImage === 'string' ? currentImage : null
  );

  const handleFileChange = (file: File | null) => {
    if (file) {
      setValue(name, file, { shouldValidate: true });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setValue(name, null, { shouldValidate: true });
      setPreview(null);
    }
  };

  const onDragEnter = useCallback(() => setIsDragging(true), []);
  const onDragLeave = useCallback(() => setIsDragging(false), []);
  const onDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  }, []);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { ref }, fieldState: { error } }) => (
        <div>
          <label
            htmlFor={name}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDrop}
            className={`flex items-center space-x-6 cursor-pointer rounded-lg border-2 border-dashed p-4 transition-colors ${
              isDragging ? 'border-blue-500 bg-blue-50' : 
              error ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <div className="flex-shrink-0 w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
              {preview ? (
                <img src={preview} alt="Vista previa" className="w-full h-full object-cover" />
              ) : (
                <Icon icon="mdi:camera-plus-outline" className="w-10 h-10 text-gray-400" />
              )}
            </div>
            <div className="flex-grow">
              <span className="font-medium text-blue-600">
                {preview ? 'Cambiar imagen' : 'Subir una imagen'}
              </span>
              <p className="text-sm text-gray-500">o arrastra y suelta</p>
              <p className="text-xs text-gray-600 mt-1">PNG, JPG, GIF hasta 2MB</p>
              <input
                id={name}
                type="file"
                accept="image/png, image/jpeg, image/gif"
                className="hidden"
                onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
                ref={ref}
              />
            </div>
          </label>
          {error && <p className="mt-2 text-sm text-red-600">{error.message}</p>}
        </div>
      )}
    />
  );
}; 
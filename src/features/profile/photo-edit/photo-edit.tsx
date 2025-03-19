import { AppDispatch, RootState } from "@/app/store/store";
import { delPhoto, putPhoto } from "@/entities/profile/my-profile/api/api";
import { setEditModal } from "@/entities/profile/my-profile/reducers/profile-slice";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const PhotoEdit = () => {
  const dispatch: AppDispatch = useDispatch();
  const { editModal } = useSelector((state: RootState) => state.myProfile);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = () => {
    if (fileInputRef.current && fileInputRef.current.files?.length) {
      const file = fileInputRef.current.files[0];
      dispatch(putPhoto(file))
      dispatch(setEditModal(false))
    }
  };

  return (
    editModal && (
      <div
        id="profile-picture-modal"
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      >
        <div className="bg-white rounded-lg shadow-lg w-96 p-6">
          <h2 className="text-xl font-semibold text-center mb-4">
            Изменить фото профиля
          </h2>
          <div className="flex flex-col items-center space-y-4">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-blue-500 font-medium hover:underline"
            >
              Загрузить фото
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
            <button
              onClick={() => dispatch(delPhoto())}
              className="text-red-500 font-medium hover:underline"
            >
              Удалить текущее фото
            </button>
            <button
              onClick={() => dispatch(setEditModal(false))}
              className="text-gray-500 font-medium hover:underline"
            >
              Отмена
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default PhotoEdit;

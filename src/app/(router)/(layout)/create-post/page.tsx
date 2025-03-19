"use client"

import { useState } from "react"
import Image from "next/image"
import * as Dialog from "@radix-ui/react-dialog"
import { ImagePlus, ArrowLeft } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/app/store/store"
import { setOpenDialog } from "@/app/store/post-slice/post-slice"
import UserProfile from "@/features/user-profile/user-profile"
import { axiosRequest } from "@/shared/utils/axiosRequest"

interface MediaItem {
  url: string
  type: "image" | "video"
  filter: string
  file: File
}

type Step = "select" | "edit" | "details"

export default function CreatePostDialog() {
  const openDialog = useSelector((state: RootState) => state.postPage.openDialog)
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  const [caption, setCaption] = useState("")
  const [currentStep, setCurrentStep] = useState<Step>("select")
  const [selectedMediaIndex, setSelectedMediaIndex] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()

  const handleMediaUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newMediaItems: MediaItem[] = []
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const reader = new FileReader()
        reader.onloadend = () => {
          newMediaItems.push({
            url: reader.result as string,
            type: file.type.startsWith("video/") ? "video" : "image",
            filter: "",
            file: file,
          })
          setMediaItems((prev) => [...prev, ...newMediaItems])
          setCurrentStep("edit")
        }
        reader.readAsDataURL(file)
      }
    }
  }

  const handleFilterChange = (filter: string) => {
    setMediaItems((prev) => prev.map((item, index) => (index === selectedMediaIndex ? { ...item, filter } : item)))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)

    try {
      const token = "YOUR_AUTH_TOKEN_HERE"
      const formData = new FormData()
      formData.append("Title", "")
      formData.append("Content", caption)

      mediaItems.forEach((item) => {
        formData.append("Images", item.file, item.file.name)
      })

      await axiosRequest({
        method: "POST",
        url: "https://instagram-api.softclub.tj/Post/add-post",
        data: formData,
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })

      dispatch(setOpenDialog(false))
      resetState()
    } catch (error) {
      console.error("Error uploading post:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const resetState = () => {
    setMediaItems([])
    setCaption("")
    setCurrentStep("select")
    setSelectedMediaIndex(0)
  }

  const filters = [
    { name: "Обычный", class: "" },
    { name: "Черно-белый", class: "grayscale" },
    { name: "Сепия", class: "sepia" },
    { name: "Размытие", class: "blur" },
    { name: "Яркость", class: "brightness-125" },
    { name: "Контраст", class: "contrast-125" },
    { name: "Насыщенность", class: "saturate-150" },
    { name: "Оттенок", class: "hue-rotate-90" },
  ]

  const renderStep = () => {
    switch (currentStep) {
      case "select":
        return (
          <div className="flex flex-col items-center justify-center h-full p-4 sm:p-8 text-center">
            <div className="mb-6">
              <ImagePlus className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 text-gray-400 dark:text-gray-600" />
              <p className="text-lg sm:text-xl mb-6">Перетащите сюда фото и видео</p>
            </div>
            <label className="cursor-pointer">
              <span className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                Выбрать на компьютере
              </span>
              <input type="file" className="hidden" accept="image/*,video/*" onChange={handleMediaUpload} multiple />
            </label>
          </div>
        )

      case "edit":
        return (
          <div className="flex flex-col md:flex-row h-full">
            <div className="flex-1 bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
              {mediaItems[selectedMediaIndex]?.type === "video" ? (
                <video
                  src={mediaItems[selectedMediaIndex].url}
                  className={`max-h-full max-w-full ${mediaItems[selectedMediaIndex].filter}`}
                  controls
                  loop
                />
              ) : (
                <Image
                  src={mediaItems[selectedMediaIndex].url || "/placeholder.svg"}
                  alt="Preview"
                  width={500}
                  height={500}
                  className={`max-h-full max-w-full object-contain ${mediaItems[selectedMediaIndex].filter}`}
                />
              )}
            </div>
            <div className="w-full md:w-[350px] border-t md:border-t-0 md:border-l border-gray-200 dark:border-gray-800">
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-4">Фильтры</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-2">
                  {filters.map((filter) => (
                    <button
                      key={filter.name}
                      className={`px-3 py-2 text-sm rounded-md border ${
                        mediaItems[selectedMediaIndex]?.filter === filter.class
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
                          : "border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                      }`}
                      onClick={() => handleFilterChange(filter.class)}
                    >
                      {filter.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )

      case "details":
        return (
          <div className="flex flex-col md:flex-row h-full">
            <div className="flex-1 bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
              {mediaItems[selectedMediaIndex]?.type === "video" ? (
                <video
                  src={mediaItems[selectedMediaIndex].url}
                  className={`max-h-full max-w-full ${mediaItems[selectedMediaIndex].filter}`}
                  controls
                />
              ) : (
                <Image
                  src={mediaItems[selectedMediaIndex].url || "/placeholder.svg"}
                  alt="Preview"
                  width={500}
                  height={500}
                  className={`max-h-full max-w-full object-contain ${mediaItems[selectedMediaIndex].filter}`}
                />
              )}
            </div>
            <div className="w-full md:w-[350px] border-t md:border-t-0 md:border-l border-gray-200 dark:border-gray-800 flex flex-col">
              <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                <UserProfile />
              </div>
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Добавьте подпись..."
                className="flex-1 w-full resize-none border-0 p-4 focus:outline-none bg-transparent dark:text-white"
                maxLength={2200}
              />
              <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">{caption.length}/2200</div>
            </div>
          </div>
        )
    }
  }

  return (
    <Dialog.Root open={openDialog} onOpenChange={(open) => dispatch(setOpenDialog(open))}>
      <Dialog.Trigger asChild>
        <button className="flex items-center gap-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
          <ImagePlus className="w-6 h-6" />
          <span>Создать</span>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[95vw] md:w-[90vw] lg:w-[1000px] h-[95vh] md:h-[90vh] lg:h-[600px] bg-white dark:bg-black text-black dark:text-white rounded-lg overflow-hidden shadow-xl z-50">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 p-4">
              {currentStep !== "select" && (
                <button
                  onClick={() => setCurrentStep(currentStep === "details" ? "edit" : "select")}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
              )}
              <Dialog.Title className="text-lg font-semibold absolute left-1/2 transform -translate-x-1/2 dark:text-white">
                Создание публикации
              </Dialog.Title>
              {currentStep === "details" ? (
                <button
                  className="text-blue-500 hover:text-blue-600 disabled:text-gray-400 dark:disabled:text-gray-600"
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? "Публикация..." : "Опубликовать"}
                </button>
              ) : currentStep === "edit" ? (
                <button
                  className="text-blue-500 hover:text-blue-600 dark:text-white dark:hover:text-blue-300"
                  onClick={() => setCurrentStep("details")}
                >
                  Далее
                </button>
              ) : (
                <div className="w-10" />
              )}
            </div>

            {renderStep()}

            {isLoading && (
              <div className="absolute inset-0 bg-black/50 dark:bg-white/10 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white dark:border-gray-800" />
              </div>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}


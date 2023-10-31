"use client"

import { useCallback, useMemo, useState } from "react"
import toast from "react-hot-toast"
import axios from "axios"
import { useRouter } from "next/navigation"
import {
    FieldValues,
    SubmitHandler,
    useForm
} from "react-hook-form"

import Modal from "@/components/modals/modal"
import useCreateToonModal from "@/hooks/usecreateToonModal"
import Heading from "../heading"
import { categories } from "@/components/category-tabs"
import GenreInput from "@/components/inputs/genre-input"
import ActionInput from "@/components/action-input"
import ImageUplaod from "@/components/inputs/image-uplaod"

enum STEPS {
    GENRE       = 0,
    INFO        = 1,
    DESCRIPTION = 2,
    IMAGES      = 3,
}

const CreateToonModal = () => {
    const router = useRouter()
    const createToon = useCreateToonModal()
    const [isLoading, setisLoading] = useState(false)
    
    const [step, setStep] = useState(STEPS.GENRE)

    const { 
        register, 
        handleSubmit, 
        setValue,
        watch,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues:{
            genre: "",
            title: "",
            author: "",
            description: "",
            summary: "",
            coverImage: "",
            imageSrc: "",

        }
    })

    const genre =watch('genre')
    const imageUrl =watch('imageUrl')

    const setcustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
        })
    }

    const onBack = () => {
        setStep((value => value - 1 ))
    }
    const onNext = () => {
        setStep((value => value + 1 ))
    }

    const actionLabel = useMemo(() =>{
        if (step === STEPS.IMAGES) {
            return 'Create'
        }

        return 'Next'
    },[step])

    const secondaryActionLabel = useMemo(() =>{
        if (step === STEPS.GENRE) {
            return undefined
        }

        return 'Back'
    },[step])
    
    // Using let because its not static
    let body = (
        <div className="flex flex-col gap-8">
           <Heading
            title="Which genre suits your toon best"
            subtitle="Select a genre"
           />
           <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-[60vh] overflow-y-auto scrollbar-hide">
            {categories.map((item) => (
                <div key={item.label} className="col-span-1">
                    <GenreInput
                        onClick={(genre) => setcustomValue('genre', genre)}
                        selected={genre === item.label}
                        label={item.label}
                        icon={item.icon}
                    />
                </div>
            ))}
           </div>
        </div>
    )
    
    if (step === STEPS.INFO) {
        body = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Provide the necessary information for your toon"
                    subtitle="The content cannot be modified by user after data is set"
                />
                <ActionInput
                    id="title"
                    label="Toon Title"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <ActionInput
                    id="author"
                    label="Author Name"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }
    if (step === STEPS.DESCRIPTION) {
        body = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="About this toon"
                    subtitle="provide a description and a summary content for this toon. You know the dril!"
                />
            </div>
        )
    }

    if (step === STEPS.IMAGES) {
        body = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Toon Images"
                    subtitle="You are to provide cover images for the toon and the toon image. The cover image will consist of a background image and the body image (You could view the site on desktop to understand). Upload the toon main image which must be of sizes around 221x240 pixels. Slider image for advertisement can be done later!"
                />
                <ImageUplaod 
                    value={imageUrl}
                    onChange={(value) => setcustomValue('imageUrl', value)}             // onChange={} 
                />
            </div>
        )
    }

    const footer = (
        <div></div>
    )

    return ( 
        <Modal
            disabled={isLoading}
            isOpen={createToon.isOpen}
            title="Create New Toon"
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.GENRE ? undefined : onBack }
            onClose={createToon.onClose}
            onSubmit={onNext}
            body={body}
            footer={footer}
        />
     );
}
 
export default CreateToonModal;
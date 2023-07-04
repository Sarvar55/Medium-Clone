"use client"
import { Box, Modal, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ProfileImage from "./ProfileImage";
import Input from "./Input";
import Button from '@/components/Button';
import React, { ChangeEvent, FC, useState } from "react";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSession } from "next-auth/react";
import User from "@/types/user/User";
import getInputValue from "@/app/(default)/posts/write/getInputValue";

type Props = {
    visibilityEditModal: boolean;
    handleCloseModal: () => void | null;
}

type FormData = {
    name: string | null;
    bio: string | null;
}

type ValidationError = {
    nameError: string | null;
    bioError: string | null;
}

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    height: 430,
    border: "1px solid #ffffff",
    bgcolor: "background.paper",
    p: 4,
};

async function ProfileCard({ visibilityEditModal, handleCloseModal }: Props) {

    const currentUser = useSession().data?.user;
    const [form, setForm] = useState<FormData>({ name: null, bio: null });
    const [validationErrors, setValidationErrors] = useState<ValidationError>({ nameError: null, bioError: null });

    const userFromApi: User = await fetch(`http://localhost:8080/api/v1/users/${currentUser.userId}`)
        .then((response) => response.json());

    const handleChangeForm = (e: ChangeEvent<HTMLInputElement>): void => {
        setValidationErrors({ nameError: null, bioError: null });

    };
    const onClickSubmit = async (): void => {

        const name = getInputValue("profilename")
        const bio = getInputValue("profilebio");

        const body = {
            username: name,
            bio
        }
        await fetch(`http://localhost:8080/api/v1/users/${currentUser.userId}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + currentUser.accessToken
            }
        })
        handleCloseModal();
    };

    const { name, bio } = form;

    const { nameError, bioError } = validationErrors;


    return (
        <Modal
            open={visibilityEditModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} className="rounded-lg shadow-lg outline-none md:w-[500px] lg:w-[600px] w-[400px]">
                <div className="top lg:text-lg w-full flex justify-between font-bold text-base">
                    Profile Information
                    <span className="cursor-pointer text-gray-400 lg:text-lg text-base" onClick={handleCloseModal}>
                        <CloseIcon />
                    </span>
                </div>
                <div className="my-5 flex flex-col">
                    <ProfileImage image={userFromApi.image} />
                    <Input
                        id="profilename"
                        name="name"
                        errorMessage={nameError}
                        error={nameError ? true : false}
                        label={userFromApi.username || "Name"}
                        required={true}
                        description={"Appears on your Profile page, as your byline, and in your responses.  0/50"} value={name} />
                    <Input
                        id="profilebio"
                        name="bio"
                        errorMessage={bioError}
                        error={bioError ? true : false}
                        label={userFromApi.bio || "Bio"}
                        description={"Appears on your Profile and next to your stories.  0/160"} value={bio} />
                </div>

                <div className="flex justify-end w-full gap-4">
                    <div className="hidden md:block">
                        <Button buttonType="delete" label="Delete account" onClick={handleCloseModal} />
                    </div>
                    <div className="block md:hidden">
                        <IconButton onClick={handleCloseModal} aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    </div>
                    <Button label="Cancel" onClick={handleCloseModal} buttonType="cancel" />
                    <Button label="Submit" onClick={onClickSubmit} buttonType="submit" />
                </div>
            </Box>
        </Modal>
    );
}

export default ProfileCard;

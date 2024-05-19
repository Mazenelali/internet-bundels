import { useState } from "react";
import Form from "../../components/form/Form";
import { addUser } from "../../utils/apisRequest";
import Snackbar from "../../components/tostify/SnackBar";
import BackButton from "../../components/backButton/BackButton";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

function AddUser() {
    const Auth = useAuthHeader();
    const [addData, setAddData] = useState({});
    const [toast, setToast] = useState({
        open: false,
        severity: "",
        message: "",
    });

    async function handleSubmit(e: any) {
        e.preventDefault();
        try {
            if (!addData) {
                setToast({
                    open: true,
                    message: "please fill all the inputs .",
                    severity: "error",
                });
            } else {
                const dataAdded = await addUser(addData);
                if (dataAdded) {
                    setToast({
                        open: true,
                        message: "User Created Successfully",
                        severity: "success",
                    });
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fields = [
        {
            label: "User name",
            inputType: "text",
            require: true,
            name: "userName",
        },
        {
            inputType: "text",
            require: true,
            name: "address",
            label: "Address",
        },
        {
            inputType: "number",
            require: true,
            name: "phoneNumber",
            label: "Phone Number",
        },
        {
            inputType: "text",
            require: true,
            name: "ipAddress",
            label: "Ip Address",
        },
        {
            inputType: "date",
            require: true,
            name: "expiryDate",
            label: "Expiry Date",
        },
        {
            inputType: "number",
            require: true,
            name: "amount",
            label: "Amount",
        },
        {
            inputType: "text",
            require: true,
            name: "antennaInfo",
            label: "Antenna Info",
        },
        {
            inputType: "text",
            require: true,
            name: "service",
            label: "Service",
        },
        {
            inputType: "radio",
            name: "paid",
            label: "Paid",
            options: [
                { label: "Yes", value: "YES" },
                { label: "No", value: "NO" },
                { label: "Free", value: "FREE" },
            ],
            require: true,
        },
    ];

    return (
        <>
            <BackButton navigatePath="/users" />{" "}
            <Snackbar
                open={toast.open}
                severity={toast.severity}
                setOpen={setToast}
                message={toast.message}
            />
            <Form
                fields={fields}
                setData={setAddData}
                textButtonSubmite="Add User"
                onSubmit={handleSubmit}
            />
        </>
    );
}

export default AddUser;

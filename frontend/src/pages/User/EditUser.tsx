import { useEffect, useState, useContext } from "react";
import Form from "../../components/form/Form";
import { useParams } from "react-router-dom";
import { LoaderContext } from "../../layout";
import { getUserById, modifyUser } from "../../utils/apisRequest";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import SnackBar from "../../components/tostify/SnackBar";
import BackButton from "../../components/backButton/BackButton";

function EditUser() {
    const { id } = useParams();
    const isLoad = useContext(LoaderContext);
    const [toast, setToast] = useState({
        open: false,
        severity: "",
        message: "",
    });

    const [editData, setEditData] = useState({
        userName: "",
        address: "",
        phoneNumber: "",
        ipAddress: "",
        expiryDate: "",
        antennaInfo: "",
        service: "",
        amount: "",
        paid: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                isLoad?.setLoad(true);
                const user = await getUserById(id);
                setEditData({
                    userName: user.userName || "",
                    address: user.address || "",
                    phoneNumber: user.phoneNumber || "",
                    ipAddress: user.ipAddress || "",
                    expiryDate: user.expiryDate
                        ? new Date(user.expiryDate).toISOString().slice(0, -1)
                        : "", // Ensure the correct format for datetime-local
                    antennaInfo: user.antennaInfo || "",
                    service: user.service || "",
                    amount: user.amount || "",
                    paid: user.paid || "",
                });
                isLoad?.setLoad(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                isLoad?.setLoad(false);
            }
        };
        fetchData();
    }, [id]);

    async function handleSubmit(e: any) {
        e.preventDefault();
        try {
            await modifyUser(id, editData);
            setToast({
                open: true,
                message: "Modified Succ !!.",
                severity: "success",
            });
        } catch (error: any) {
            console.error(error);
            setToast({
                open: true,
                message: error.response?.data?.message || "Error occurred",
                severity: "error",
            });
        }
    }

    const fields = [
        {
            label: "User name",
            inputType: "text",
            require: true,
            name: "userName",
            value: editData.userName,
        },
        {
            label: "Address",
            inputType: "text",
            require: true,
            name: "address",
            value: editData.address,
        },
        {
            label: "Phone Number",
            inputType: "number",
            require: true,
            name: "phoneNumber",
            value: editData.phoneNumber,
        },
        {
            label: "Ip Address",
            inputType: "text",
            require: true,
            name: "ipAddress",
            value: editData.ipAddress,
        },
        {
            label: "Expiry Date",
            inputType: "date",
            require: true,
            name: "expiryDate",
            value: editData.expiryDate
                ? new Date(editData.expiryDate).toISOString().split("T")[0]
                : "",
        },
        {
            label: "Amount",
            inputType: "number",
            require: true,
            name: "amount",
            value: editData.amount,
        },
        {
            label: "Antenna Info",
            inputType: "text",
            require: true,
            name: "antennaInfo",
            value: editData.antennaInfo,
        },
        {
            label: "Service",
            inputType: "text",
            require: true,
            name: "service",
            value: editData.service,
        },
        {
            label: "Paid",
            inputType: "radio",
            name: "paid",
            options: [
                { label: "Yes", value: "YES" },
                { label: "No", value: "NO" },
                { label: "Free", value: "FREE" },
            ],
            require: true,
            value: "Yes",
        },
    ];

    return (
        <>
            <BackButton navigatePath="/users" />
            <SnackBar
                open={toast.open}
                severity={toast.severity}
                setOpen={setToast}
                message={toast.message}
            />
            <Form
                fields={fields}
                setData={setEditData}
                textButtonSubmite="MOdify User"
                onSubmit={handleSubmit}
            />
        </>
    );
}

export default EditUser;

import Box from "@mui/material/Box";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import Delete from "../../components/buttons/Delete";
import Edit from "../../components/buttons/Edit";
import { useNavigate } from "react-router-dom";
import DataTable from "../../components/dataTable/DataGrid";
import { useState, useEffect } from "react";
import { getAllUsers } from "../../utils/apisRequest";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { LoaderContext } from "../../layout";
import { useContext } from "react";

interface UserObject {
    id: string;
    userName: string;
    address: string;
    phoneNumber: number;
    ipAddress: string;
    expiryDate: string;
    antennaInfo: string;
    service: string;
    amount: number;
    paid: string;
}

function User() {
    const navigate = useNavigate();
    const [dataUser, setDataUser] = useState(null);

    const isLoad = useContext(LoaderContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                isLoad?.setLoad(true);
                const users: any = await getAllUsers();
                setTimeout(() => {
                    setDataUser(users);
                    isLoad?.setLoad(false);
                }, 500);
            } catch (error) {
                console.log("Error fetching data:", error);
                isLoad?.setLoad(false);
            }
        };
        fetchData();
    }, []);

    const columns: GridColDef<UserObject>[] = [
        {
            field: "userName",
            headerName: "user name",
            width: 130,
        },
        {
            field: "address",
            headerName: "Adress",
            width: 150,
        },
        {
            field: "phoneNumber",
            headerName: "Phone Number",
            width: 180,
        },
        {
            field: "ipAddress",
            headerName: "Ip Adress",
            width: 160,
        },
        {
            field: "expiryDate",
            headerName: "Expiry Date",
            width: 200,
            renderCell: ({ row }: { row: UserObject }) => {
                return <> {row.expiryDate.replace("T", " ").slice(0, 16)} </>;
            },
        },
        {
            field: "antennaInfo",
            headerName: "Antenna Info",
            width: 150,
        },
        {
            field: "service",
            headerName: "Service",
            width: 120,
        },
        {
            field: "amount",
            headerName: "Amount",
            width: 100,
        },
        {
            field: "paid",
            headerName: "Paid",
            width: 110,
            renderCell: ({ row }: { row: UserObject }) => {
                return (
                    <>
                        {" "}
                        {row.paid}
                        {/* {row.paid   ? (
                            <CheckCircleIcon sx={{ color: "#52b963" }} />
                        ) : (
                            <HighlightOffIcon sx={{ color: "#cc0000" }} />
                        )}{" "} */}
                    </>
                );
            },
        },
        {
            field: "Actions",
            headerName: "Actions",
            width: 120,
            renderCell: ({ row }) => {
                return (
                    <>
                        <GridActionsCellItem
                            onClick={() => {
                                navigate(`edit-users/${row.id}`);
                            }}
                            icon={<Edit />}
                            label="Edit"
                            color="inherit"
                        />
                        <GridActionsCellItem
                            icon={<Delete />}
                            label="Delete"
                            color="inherit"
                        />
                    </>
                );
            },
        },
    ];
    return (
        <Box>
            {dataUser !== null && (
                <DataTable
                    columns={columns}
                    rows={dataUser}
                    buttonText="add user"
                    onClickAddButton={() => navigate("add-users")}
                />
            )}
        </Box>
    );
}

export default User;

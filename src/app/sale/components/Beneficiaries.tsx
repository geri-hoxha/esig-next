"use client";

import Participants from "@/components/esig/Participants";
import { IContext, useSale } from "@/context/SaleContext";
import { SET } from "@/context/reducer";
import { useEffect } from "react";

const fakeData = [
    {
        id: "1",
        displayName: "Agim Molla",
        ownershipPercentage: 12
    },
    {
        id: "2",
        displayName: "Filan Fisteku",
        ownershipPercentage: 4
    },
    {
        id: "3",
        displayName: "Fiqiri Bobi",
        ownershipPercentage: 9
    },
    {
        id: "4",
        displayName: "Agim Molla",
        ownershipPercentage: 9
    },
    {
        id: "5",
        displayName: "Filan Fisteku",
        ownershipPercentage: 9
    },
    {
        id: "6",
        displayName: "Fiqiri Bobi",
        ownershipPercentage: 9
    },
    {
        id: "7",
        displayName: "Agim Molla",
        ownershipPercentage: 9
    },
    {
        id: "8",
        displayName: "Filan Fisteku",
        ownershipPercentage: 9
    },
    {
        id: "9",
        displayName: "Fiqiri Bobi",
        ownershipPercentage: 9
    },
    {
        id: "10",
        displayName: "Agim Molla",
        ownershipPercentage: 9
    },
    {
        id: "11",
        displayName: "Filan Fisteku",
        ownershipPercentage: 9
    },
    {
        id: "12",
        displayName: "Fiqiri Bobi",
        ownershipPercentage: 9
    },
];

export default function Beneficiaries() {

    const { dispatch, setRules }: IContext = useSale();

    useEffect(() => {
        dispatch({ type: SET, payload: { key: "beneficiaries", item: fakeData } });

        setRules({
            beneficiaries: {
                min: 3,
                max: 10
            }
        })

    }, []);

    return (
        <Participants
            title="Beneficiaries"
            contextProperty={"beneficiaries"}
        />
    );
}

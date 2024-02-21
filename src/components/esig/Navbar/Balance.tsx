'use client';

import { useState } from "react";
import { Button } from "../../ui/button";
import request from "@/request";
import { token } from "./Currencies";
import { CircleDollarSign } from "lucide-react";

export default function Balance() {
    const [balance, setBalance] = useState<number[]>([])
    
    const [loading, setLoading] = useState<boolean>(false);

    const onClick = async () => {
        if(loading) return;

        try {
            setLoading(true);
            const [EUR, ALL] = await Promise.all([request('/agency/balance/EUR', token), request('/agency/balance/ALL', token)])
            setBalance([EUR.data || 0, ALL.data || 0]);
        } finally {
            setLoading(false)
            setTimeout(() => {
                setBalance([]);
            }, 5000)
        }
    }

    if (balance.length !== 0) {
        return <Button className="w-40 mr-3" variant="outline"><span className="font-bold text-lg rounded-lg">{balance[0]}€ / {balance[1]}L</span></Button>
    }

    return (
        <Button size={'sm'} icon={<CircleDollarSign size={20} />} loading={loading} onClick={onClick} className="w-40 bg-esig rounded-lg">Check balance</Button>
    )
}
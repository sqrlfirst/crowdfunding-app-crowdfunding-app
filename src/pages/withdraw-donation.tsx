import * as React from "react";

import {
    type BaseError,
    useWaitForTransactionReceipt,
    useWriteContract,
} from "wagmi";
import { abi } from "./abi";

export function WithdrawDonation() {
    const { data: hash, error, isPending, writeContract } = useWriteContract();

    async function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        writeContract({
            address: `0x303D894341130172236F2e521017Db8a545AF78d`,
            abi,
            functionName: "withdrawDonation",
            args: [],
        });
    }

    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({
            hash,
        });

    return (
        <form onSubmit={submit}>
            <button disabled={isPending} type="submit">
                {isPending ? "Confirming..." : "WithdrawDonation"}{" "}
            </button>
            {hash && <div>Transaction Hash: {hash}</div>}
            {isConfirming && <div>Waiting for confirmation...</div>}
            {isConfirmed && <div>Transaction confirmed.</div>}
            {error && (
                <div>
                    Error: {(error as BaseError).shortMessage || error.message}
                </div>
            )}
        </form>
    );
}

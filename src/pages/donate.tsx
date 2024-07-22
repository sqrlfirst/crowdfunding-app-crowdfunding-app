import * as React from "react";
import {
    type BaseError,
    useWaitForTransactionReceipt,
    useWriteContract,
} from "wagmi";
import { abi } from "./abi";
import { ethers } from "ethers";

export function Donate() {
    const { data: hash, error, isPending, writeContract } = useWriteContract();

    async function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const value = formData.get("value") as string;
        writeContract({
            address: `0x303D894341130172236F2e521017Db8a545AF78d`,
            abi,
            functionName: "donate",
            args: [],
            value: ethers.parseEther(value),
        });
    }

    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({
            hash,
        });

    return (
        <form onSubmit={submit}>
            <input name="value" placeholder="0.05 ETH" required type="text" />
            <button disabled={isPending} type="submit" class="button">
                {isPending ? "Confirming..." : "Donate"}{" "}
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

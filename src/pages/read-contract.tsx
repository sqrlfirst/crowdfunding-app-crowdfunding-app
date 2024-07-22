import { type BaseError, useReadContracts } from "wagmi";
import { abi } from "./abi";
import { ethers } from "ethers";

export function ReadContract() {
    const { data, error, isPending } = useReadContracts({
        contracts: [
            {
                address: `0x303D894341130172236F2e521017Db8a545AF78d`,
                abi,
                functionName: "deadline",
                args: [],
            },
            {
                address: `0x303D894341130172236F2e521017Db8a545AF78d`,
                abi,
                functionName: "goal",
                args: [],
            },
            {
                address: `0x303D894341130172236F2e521017Db8a545AF78d`,
                abi,
                functionName: "goalIsMeet",
                args: [],
            },
        ],
    });
    const [deadline, goal, goalIsMeet] = data || [];
    // console.log(process.env.CONTRACT_ADDRESS);
    const deadline_str = deadline?.result?.toString();
    const goal_str = goal?.result?.toString();
    const isMeet = goalIsMeet?.result?.toString();

    if (typeof deadline_str === "string" && typeof goal_str === "string") {
        const date = new Date(Number(deadline?.result?.toString()) * 1000);
        const value = ethers.formatEther(goal_str);
        const whatIsWithTheGoal =
            isMeet === "true" ? "goal is met already" : "goal is not gained";

        return (
            <>
                <div class="container">
                    <div class="text_block">
                        Deadline is: {date.toDateString()}
                    </div>
                    <div class="text_block">Goal is: {value} Ether</div>
                    <div class="text_block"> {whatIsWithTheGoal}</div>
                </div>
            </>
        );
    }

    if (isPending) return <div>Loading...</div>;

    if (error)
        return (
            <div>
                Error: {(error as BaseError).shortMessage || error.message}
            </div>
        );

    return (
        <>
            <div>Deadline is: {deadline?.result?.toString()}</div>
            <div>Goal is: {goal?.result?.toString()}</div>
            <div>goalIsMeet: {goalIsMeet?.result?.toString()}</div>
        </>
    );
}

import { useState } from "react";
import PhaseOne from "../components/PostAJobComponents/PhaseOne";
import PhaseTwo from "../components/PostAJobComponents/PhaseTwo";
import PhaseThree from "../components/PostAJobComponents/PhaseThree";

const PostAJob = () => {
    const [phase, setPhase] = useState(1);
    return (
        <div className="bg-[#eff2f7] min-h-screen py-10">
            {
                phase === 1 && <PhaseOne phase={phase} setPhase={setPhase} />
            }
            {
                phase === 2 && <PhaseTwo phase={phase} setPhase={setPhase} />
            }
            {
                phase === 3 && <PhaseThree phase={phase} setPhase={setPhase} />
            }
        </div>
    );
};

export default PostAJob;
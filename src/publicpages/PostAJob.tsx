import { useState } from "react";
import PhaseOne from "../components/PostAJobComponents/PhaseOne";
import PhaseTwo from "../components/PostAJobComponents/PhaseTwo";
import PhaseThree from "../components/PostAJobComponents/PhaseThree";

const PostAJob = () => {
    const [phase, setPhase] = useState(1);

    const progressPercent = () => {
        if (phase === 1) return 20;
        if (phase === 2) return 60;
        return 90;
    };

    return (
        <div>
            <div className="py-6 px-4 fixed top-[10%] left-0 right-0 bg-white shadow-md z-10">
                <div className="max-w-[1180px] mx-auto flex items-center justify-between">
                    <div>
                        <div className="text-sm font-medium">Budget & Timeline</div>
                        <div className="text-xs text-secondary">Step {phase} of 3 · Add the finishing touches</div>
                    </div>
                    <button className="text-2xl">✕</button>
                </div>

                <div className="max-w-[1180px] mx-auto mt-4">
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                        <div
                            className="h-2 rounded-full bg-[#FF7346] transition-all duration-700"
                            style={{ width: `${progressPercent()}%` }}
                        />
                    </div>
                </div>

                <div className="max-w-[1180px] mx-auto mt-2 text-right text-xs text-secondary">{progressPercent()}% Complete</div>
            </div>

            <div className="bg-[#eff2f7] min-h-screen pt-[8%] py-10">
                {phase === 1 && <PhaseOne phase={phase} setPhase={setPhase} />}
                {phase === 2 && <PhaseTwo phase={phase} setPhase={setPhase} />}
                {phase === 3 && <PhaseThree phase={phase} setPhase={setPhase} />}
            </div>
        </div>
    );
};

export default PostAJob;
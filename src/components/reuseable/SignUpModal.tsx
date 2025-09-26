import {  useNavigate } from "react-router-dom";


interface SignUpModalProps {
    signupModal: boolean;
    setsignupModal: any;
}
const SignUpModal = ({signupModal, setsignupModal}: SignUpModalProps) => {
    const navigate = useNavigate()
    if (!signupModal) return null;

    const handleRoute = (route: string) =>{
        setsignupModal(false);
        navigate(route);
    }

    return (
        <div className='fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50'>
           <div className='bg-white p-10 rounded-md shadow-md min-w-lg text-center relative'>
            <h1 className='text-2xl font-semibold'>Signup as</h1>
            <button onClick={() => setsignupModal(false)} className='absolute top-3 right-3 text-xl font-bold'>X</button>
            <div className='flex items-center justify-center gap-10 mt-5 text-lg'>
                <button onClick={()=>handleRoute("/trade-signup") } className='bg-primary text-white font-semibold px-5 py-2 rounded-xl' >Join as Tradeperson</button>
                <button onClick={()=>handleRoute("/general-signup") } className='bg-white text-black border border-primary font-semibold px-5 py-2 rounded-xl'>General User</button>
            </div>
           </div>
        </div>
    );
};

export default SignUpModal;
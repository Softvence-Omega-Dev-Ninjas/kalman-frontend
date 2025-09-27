import {  useNavigate } from "react-router-dom";
import { useEffect } from "react";
import React from "react";

interface SignUpModalProps {
    signupModal: boolean;
    setsignupModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const SignUpModal = ({signupModal, setsignupModal}: SignUpModalProps) => {
    const navigate = useNavigate()

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setsignupModal(false);
        };
        if (signupModal) document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [signupModal, setsignupModal]);

    if (!signupModal) return null;

    const handleRoute = (route: string) =>{
        setsignupModal(false);
        navigate(route);
    }

    return (
        <div className='fixed inset-0 z-50'>
            <div onClick={() => setsignupModal(false)} className='absolute inset-0 bg-black opacity-30' />

            <div className='relative mx-auto my-12 max-w-md w-11/12 bg-white rounded-md shadow-md p-6 sm:p-8'>
                <h1 className='text-2xl font-semibold text-center'>Signup as</h1>
                <button onClick={() => setsignupModal(false)} className='absolute top-3 right-3 text-xl font-bold'>X</button>

                <div className='mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-base'>
                    <button onClick={()=>handleRoute("/trade-signup") } className='w-full sm:w-auto bg-primary text-white font-semibold px-5 py-2 rounded-xl' >Join as Tradeperson</button>
                    <button onClick={()=>handleRoute("/general-signup") } className='w-full sm:w-auto bg-white text-black border border-primary font-semibold px-5 py-2 rounded-xl'>General User</button>
                </div>
            </div>
        </div>
    );
};

export default SignUpModal;
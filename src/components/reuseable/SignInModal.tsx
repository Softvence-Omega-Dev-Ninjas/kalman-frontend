import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import React from "react";
import { RxCross2 } from "react-icons/rx";


interface SignInModalProps {
    siginModal: boolean;
    setsigninModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const SignInModal = ({siginModal ,setsigninModal}: SignInModalProps) => {
    const navigate = useNavigate()
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setsigninModal(false);
        };
        if (siginModal) document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [siginModal, setsigninModal]);

    if (!siginModal) return null;

    const handleRoute = (route: string) =>{
        setsigninModal(false);
        navigate(route);
    }

    return (
        <div className='fixed inset-0 z-50'>
            {/* backdrop */}
            <div onClick={() => setsigninModal(false)} className='absolute inset-0 bg-black opacity-30' />

            <div className='relative mx-auto my-12 max-w-md w-11/12 bg-white rounded-md shadow-md p-6 sm:p-8'>
                <h1 className='text-2xl font-semibold text-center'>Signin as</h1>
                <button onClick={() => setsigninModal(false)} className='absolute top-3 cursor-pointer right-3 text-xl font-bold'> <RxCross2  size={24}/></button>

                <div className='mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-base'>
                    <button onClick={()=>handleRoute("/trade-login") } className='w-full cursor-pointer sm:w-auto bg-primary text-white font-semibold px-5 py-2 rounded-xl'>Login as Tradeperson</button>
                    <button onClick={()=>handleRoute("/general-login") } className='w-full cursor-pointer sm:w-auto bg-white text-black border border-primary font-semibold px-5 py-2 rounded-xl'>General User</button>
                </div>
            </div>
        </div>
    );
};

export default SignInModal;
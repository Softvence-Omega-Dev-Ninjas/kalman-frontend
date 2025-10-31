
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const TradeSuccessPage = () => {

        useEffect(()=>{
              document.title = `Trade Success | Stavbar`
            }, [])

    const navigate = useNavigate();

    useEffect(() => {
        Swal.fire({
            title: 'Success',
            text: 'Your trade profile has been created successfully.',
            icon: 'success',
            confirmButtonText: 'Back to Home',
            allowOutsideClick: false,
            allowEscapeKey: false,
        }).then((result) => {
            // navigate home when user clicks the confirm button
            if (result.isConfirmed) navigate('/');
        });
    }, [navigate]);

    return <div />;
};

export default TradeSuccessPage;
import { useEffect, useState } from "react";
import { BsFillCartCheckFill, BsFillCartXFill } from 'react-icons/bs';

export default function Toaster(){
    const [snackbarType, setSnackbarType] = useState('');
    const [message, setMessage] = useState('');
    const [open, setOpen] = useState(false);

    useEffect(() => {

        function checkAdd() {
            setOpen(true);
            setMessage('Product succesvol toegevoegd!');
            setSnackbarType('succes');
        }

        function checkClose(){
            setOpen(true);
            setMessage("Product succesvol verwijderd!"); 
            setSnackbarType("error");
        }

        window.addEventListener('addProduct', checkAdd);
        window.addEventListener('removeProduct', checkClose);
      
        return () => {
          window.removeEventListener('addProduct', checkAdd);
          window.removeEventListener('removeProduct', checkClose);
        }
      }, []);

    useEffect(() => {
        setTimeout(() => {
            closeSnackbar();
        }, 2000)
    })
    
    function closeSnackbar(){
        setOpen(false); 
        setMessage(''); 
        setSnackbarType('');
    }

    return(
        <>
            {snackbarType == "succes" ? 
                <div className={"fixed bottom-10 right-10 flex items-center p-4 space-x-4 w-full max-w-sm text-white text-lg font-bold bg-green-600 rounded-lg divide-x divide-gray-200 shadow " + (open ? '' : 'hidden') }>
                    <BsFillCartCheckFill></BsFillCartCheckFill>
                    <div className="pl-4">{message}</div>
                </div>
            : 
                <div className={"fixed bottom-10 right-10 flex items-center p-4 space-x-4 w-full max-w-sm text-white text-lg font-bold bg-red-600 rounded-lg divide-x divide-gray-200 shadow " + (open ? '' : 'hidden') }>
                    <BsFillCartXFill></BsFillCartXFill>
                    <div className="pl-4">{message}</div>
                </div>
            }
        </>
    )
}
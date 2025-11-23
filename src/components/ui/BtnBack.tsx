'use client'
import { usePathname } from 'next/navigation';
import { useRouter } from "next/navigation";
import { CircleArrowLeft } from 'lucide-react';


export default function BtnBack (){
    const pathname = usePathname();
    const isHome = pathname === '/';
    const router = useRouter();

    const handleBack = () => {
        router.back();
    }
    if (isHome) return null

    return(
        <>
            <button
                className='button btn-back '
                onClick={handleBack}
            >
                <CircleArrowLeft/>
            </button>
        </>
    )

}
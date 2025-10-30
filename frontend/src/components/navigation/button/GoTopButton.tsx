import { useEffect, useState } from "react"

function GoTopButton() {
    const [visible, setVisible] = useState<boolean>(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if(window.scrollY > 300) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        }

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, [])

    const scrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            <div className="top">
                {visible && (
                    <button
                    type="button"
                    className="goTop"
                    onClick={scrollTop}
                    aria-label="Till topp">
                        ⬆
                    </button>
                )}
            </div>
        
        </>
    )
}

export default GoTopButton;
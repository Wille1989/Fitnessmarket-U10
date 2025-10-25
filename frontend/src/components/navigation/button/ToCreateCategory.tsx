import { useNavigate } from "react-router-dom";

function NavigateToCreateCategory() {
   const navigate = useNavigate();

   const handleOnClick = () => {

    navigate('/productDashboard/createCategory')
   }
   
    return (
        <button onClick={handleOnClick}>Skapa ny kategori</button>
    )
}

export default NavigateToCreateCategory;
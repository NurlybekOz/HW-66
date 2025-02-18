
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Loader from "../../UI/Loader/Loader.tsx";
import axiosApi from "../../axiosApi.ts";
import {toast} from "react-toastify";
import {IFoodForm} from "../../types";
import FoodForm from "../../components/FoodForm/FoodForm.tsx";


const NewFood = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const onSubmitAddNewFood = async (food: IFoodForm) => {
        try {
            setLoading(true);
            await axiosApi.post("/meals.json", food);
            toast.success("New Meal Added!")
            navigate("/");
        } catch (e) {
            alert(e)
        } finally {
            setLoading(false);
        }
    }
    let form = (<FoodForm onSubmitAction={onSubmitAddNewFood} isEdit={false}/>)

    if (loading) form = <Loader/>
    return (
        <div>
            {form}
        </div>
    );
};

export default NewFood;
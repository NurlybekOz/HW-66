import {useState} from "react";
import axiosApi from "../../axiosApi.ts";
import {toast} from "react-toastify";
import Loader from "../../UI/Loader/Loader.tsx";
import {IFoodForm} from "../../types";
import FoodForm from "../../components/FoodForm/FoodForm.tsx";
import {useParams} from "react-router-dom";




const EditFood = () => {
    const [loading, setLoading] = useState(false);
    const {idFood} = useParams();

    const onSubmitAddNewFood = async (food: IFoodForm) => {
        try {
            setLoading(true);
            await axiosApi.put(`meals/${idFood}.json`, food);
            toast.success("Meal was successfully edited!");
        } catch (e) {
            alert(e)
        } finally {
            setLoading(false);
        }
    }
    let form = (<FoodForm onSubmitAction={onSubmitAddNewFood} isEdit={true} idFood={idFood} />)

    if (loading) form = <Loader/>
    return (
        <div>
            {form}
        </div>
    );
};

export default EditFood;
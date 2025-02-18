import {IFood, IFoodApi} from "../../types";
import {useCallback, useEffect, useState} from "react";
import axiosApi from "../../axiosApi.ts";
import Loader from "../../UI/Loader/Loader.tsx";
import Grid from "@mui/material/Grid2";
import FoodItem from "../../components/FoodItem/FoodItem.tsx";
import {toast} from "react-toastify";
import {NavLink} from "react-router-dom";
import {Button} from "@mui/material";


const Home = () => {
    const [foods, setFoods] = useState<IFood[]>([]);
    const [loading, setLoading] = useState(false);
    const [totalCalories, setTotalCalories] = useState<number>(0);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true)
            const response = await axiosApi<IFoodApi>('meals.json');

            if (response.data) {
                const mealsObject = response.data;
                const mealsObjectKeys = Object.keys(mealsObject);
                const mealsArray = mealsObjectKeys.map(mealIdOrKey => {
                    return {
                        ...mealsObject[mealIdOrKey],
                        id: mealIdOrKey,
                    }
                })
                const totalCalories = mealsArray.reduce((acc, food) => {
                    return acc + (Number(food.calories) || 0);
                }, 0);
                setTotalCalories(totalCalories);
                setFoods(mealsArray);
            } else {
                setFoods([])
            }

        } catch (e) {
            alert(e);
        } finally {
            setLoading(false);
        }

    }, [])

    useEffect(() => {
        void fetchData();
    }, [fetchData]);

    const deleteFood = async (food: IFood) => {
        if (food.id) {
            try {
                setLoading(true);
                await axiosApi.delete<IFoodApi>(`meals/${food.id}.json`);
                const updatedFoods = foods.filter((f) => f.id !== food.id);
                setFoods(updatedFoods);
                const newTotalCalories = updatedFoods.reduce((acc, food) => {
                    return acc + (Number(food.calories) || 0);
                    }, 0);
                setTotalCalories(newTotalCalories);
                void fetchData();
                toast.success("Meal was successfully deleted!");
            } catch (e) {
                alert(e);
            } finally {
                setLoading(false);
            }
        }
    };

    let content = null;

    if (loading) {
        content = <Loader />;
    }

    if (!loading) {
        if (foods.length > 0) {
            content = (
                <Grid container spacing={2} className='mt-2'>
                    {foods.map(food => (
                        <Grid key={food.id}>
                            <FoodItem food={food} onDeleteFood={() => deleteFood(food)}/>
                        </Grid>
                    ))}
                </Grid>
            )
        } else {
            content = (<h2 className='w-100 text-center mt-2'>no foods yet..</h2>)
        }
    }
    return (
        <>
        <div className='container'>
            <div className='d-flex justify-content-between p-2 align-items-center' >
                <span>Total Calories: <strong>{totalCalories} kcal</strong></span>
                <Button color="primary" component={NavLink} variant="contained" to={`/meals/new-meal`}>Add new meal</Button>
            </div>
            <hr className='m-0'/>
            {content}
        </div>
        </>
    );
};

export default Home;
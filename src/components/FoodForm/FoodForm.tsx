import {useCallback, useEffect, useState} from "react";
import {IFoodForm} from "../../types";
import {useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
import axiosApi from "../../axiosApi.ts";
import Loader from "../../UI/Loader/Loader.tsx";
import {Button, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import ButtonSpinner from "../../UI/ButtonSpinner/ButtonSpinner.tsx";

interface Props {
    isEdit?: boolean;
    idFood?: string;
    onSubmitAction: (food: IFoodForm) => void;
}


const FoodForm: React.FC<Props> = ({isEdit = false, onSubmitAction, idFood}) => {
    const [form, setForm] = useState<IFoodForm>({
        time: '',
        name: '',
        calories: 0,
    })
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const fetchOneFood = useCallback(async () => {
        if (!idFood) return;

        try {
            setLoading(true)
            const response = await axiosApi<IFoodForm>(`meals/${idFood}.json`);
            if (!response.data) {
                toast.error('Food not found');
                navigate('/')
                return;
            }
            setForm(response.data);
        } catch (e) {
            alert(e);
        } finally {
            setLoading(false);
        }

    }, [idFood, navigate])

    useEffect(() => {
        void fetchOneFood();
    }, [fetchOneFood])

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!form.name || !form.time || !form.calories) {
            toast.error('all fields are required');
            return;
        }
        onSubmitAction({...form})
    }
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
        const { name, value } = e.target;
        setForm({...form, [name]: value})
    }
    return (
        <>
            {loading ? <Loader/> :
                <form onSubmit={onSubmit}>
                    <Typography variant='h4' sx={{flexGrow: 1, textAlign: 'center'}}>{isEdit ? 'Edit' : 'Add new food'}</Typography>

                    <Grid container spacing={2} sx={{mx: 'auto', width: '50%', mt: 4}}>
                        <Grid size={12}>
                            <InputLabel id="demo-simple-select-label">Time:</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name='time'
                                value={form.time || 'default'}
                                label="time"
                                onChange={onInputChange}
                            >
                                <MenuItem value='default' disabled>Meal time</MenuItem>
                                <MenuItem value='breakfast'>BreakFast</MenuItem>
                                <MenuItem value='snack'>Snack</MenuItem>
                                <MenuItem value='lunch'>Lunch</MenuItem>
                                <MenuItem value='dinner'>Dinner</MenuItem>
                            </Select>
                        </Grid>

                        <Grid size={12}>
                            <TextField
                                sx={{width: '100%'}}
                                label="name"
                                name="name"
                                variant="outlined"
                                value={form.name}
                                onChange={onInputChange}
                            >

                            </TextField>
                        </Grid>
                        <Grid size={12}>
                            <TextField
                                sx={{width: '100%'}}
                                label="Calories"
                                name="calories"
                                variant="outlined"
                                value={form.calories}
                                onChange={onInputChange}
                            >

                            </TextField>
                        </Grid>

                        <Grid size={12}>
                            {loading ? <ButtonSpinner/> :
                                <Button sx={{width: '100%'}} type='submit' variant='contained'>{isEdit ? 'Save' : 'Add'}</Button>
                            }
                        </Grid>
                    </Grid>

                </form>
            }
        </>

    );
};

export default FoodForm;
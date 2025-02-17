import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import {IFood} from "../../types";
import {NavLink} from "react-router-dom";

interface Props {
    food: IFood;
    onDeleteFood: React.MouseEventHandler;
}


const FoodItem:React.FC<Props> = ({food, onDeleteFood}) => {
    return (
        <Card variant='outlined' sx={{minWidth: 275}}>
            <CardContent>
                <Typography gutterBottom sx={{fontSize: 19 }}>
                    <i>{food.time}</i>
                </Typography>
                <hr/>
                <Typography gutterBottom sx={{fontSize: 19 }}>
                    <span>{food.name}</span>
                </Typography>
                <Typography gutterBottom sx={{fontSize: 19 }}>
                    <strong>{food.calories} kcal</strong>
                </Typography>

            </CardContent>
            <CardActions>
                <Button size="small" variant='contained' component={NavLink} to={`/meals/${food.id}/edit`}>Edit</Button>
                <Button size="small" variant='contained' color='error' onClick={onDeleteFood}>Delete</Button>
            </CardActions>
        </Card>
    );
};

export default FoodItem;
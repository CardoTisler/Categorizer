import {Grid} from "@material-ui/core";
import { Checkbox, makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showError } from "src/redux/actions/errorActions";
import { updateTransactionsCategory } from "src/redux/actions/transactionActions";
import { Transaction } from "../../../@types/TransactionTypes/Transaction";
import {checkTransaction, unCheckTransaction} from "../../redux/actions/transactionCheckboxActions";
import RowDropdown from "./RowDropdown";

const useStyles = makeStyles({
    root: {
        textAlign: "center",
    },
});
// TODO: if rendering positive or 0 number to amount column, font green, otherwise default
// TODO: Implement single category change functionality
/**
 * Find the transaction.name value based on transactionId, then find all transactions
 * that have the same name value and update their transaction.category field to reference
 * the new category Id.
 * @async
 * @param newCategoryId The _id value of the category that is applied to Transaction
 * @param transactionId The _id of Transaction that was modified.
 */
const handleCategoryUpdate = async (newCategoryId: string, transactionId: string): Promise<any> => {
    const url = "/transactions/update/".concat(transactionId);
    await fetch(url, {
        method: "PUT",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({newCategoryId}),
    }).then((res) => {
        if (res.status === 200) {
            return res.json();
        }
        throw new Error(res.statusText);
    }).catch((err: Error) => {
        throw new Error(err.message);
    });
  };

interface IProps {
    data: Transaction;
    isAllChecked: boolean;
}
const TransactionsRow: React.FC<IProps> = (props) => {
    const {date, name, description, amount, category, _id} = props.data;
    const classes = useStyles();
    const [currentCategoryId, setCurrentCategoryId] = useState("0");
    const [isThisChecked, setIsThisChecked] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        // Unpopulated (Mongoose population) Transactions SHOULD NOT arrive here but if they
        // do then this logic avoids unneccesary crash.
        if (typeof category !== "string") {
            setCurrentCategoryId(category._id);
        } else {
            setCurrentCategoryId(category);
        }
    }, [category, currentCategoryId]);
    /**
     * Triggered when user clicks on an option in RowDropdown component.
     * Takes the click event as parameter and extracts option value (category._id) from it
     * and then makes API request to change all suitable transactions' categories.
     * @param e Event generated when clicking on an option in the dropdown.
     */
    const handleChange = async (e: { target: { value: string; } }) => {
        if (e.target !== null) {
          const newCategoryId = e.target.value;
          await handleCategoryUpdate(newCategoryId, _id!).then((res: any) => {
              setCurrentCategoryId(newCategoryId);
              dispatch(updateTransactionsCategory(name, newCategoryId));
          }).catch((err: Error) => {
            dispatch(showError(`Couldn't update transaction category.`, err.message));
          });
        }
    };
    const handleCheckboxChange = (event: {target: {checked: boolean}}) => {
        if (event.target.checked) {
            setIsThisChecked(true);
            dispatch(checkTransaction({transactionId: _id!}));
        } else {
            setIsThisChecked(false);
            dispatch(unCheckTransaction({transactionId: _id!}));
        }
    };
    const [month, day, year] = new Date(date).toLocaleDateString().split("/");
    return (
        <Grid container className={classes.root}>
            <Grid container item xs={2}>
                <Grid item xs={2}>
                    <Checkbox
                    onChange={handleCheckboxChange}
                    checked={props.isAllChecked || isThisChecked}/>
                </Grid>
                <Grid item xs={10}>
                    <p>{day.concat("/").concat(month).concat("/").concat(year)}</p>
                </Grid>
            </Grid>
            <Grid item xs={2}>
                <p>{name}</p>
            </Grid>
            <Grid item xs={6}>
                <p>{description}</p>
            </Grid>
            <Grid item xs={1}>
                <p>{amount}</p>
            </Grid>
            <Grid item xs={1}>
                <RowDropdown
                handleChange={handleChange}
                currentCategory={category} />
            </Grid>
        </Grid>
    );
};

export default TransactionsRow;

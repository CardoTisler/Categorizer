import {makeStyles, TextField} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import {SetStateAction, useState} from "react";

const useStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "row",
        padding: "0.5rem",
    }, searchBar: {
        width: "100%",
    }, searchIcon: {
        width: "50px",
        textAlign: "center",
        alignSelf: "center",
    },
});

const TransactionsSearch = () => {
    const classes = useStyles();
    const [searchInput, setSearchInput] = useState("");

    const handleInput = (e: { target: { value: SetStateAction<string>; }; }) => {
        setSearchInput(e.target.value);
    };

    return (
        <div className={classes.root}>
            <TextField
            id="filled-basic"
            label="Search Transactions"
            name="transactionSearchField"
            onChange={handleInput}
            value={searchInput}
            className={classes.searchBar}
            />
            <div className={classes.searchIcon}>
                <SearchIcon />
            </div>
        </div>
    );
};

export default TransactionsSearch;

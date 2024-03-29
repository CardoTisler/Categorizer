import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

interface Props {
    icon: any;
    text: string;
}

const useStyles = makeStyles({
    root: {
        border: 0,
        borderRadius: 3,
        height: 48,
        padding: "0 30px",
        width: "100%",
        fontSize: "0.8rem",
    },
});

const NavButton: React.FC<Props> = (props) => {
    const {text, icon} = props;
    const classes = useStyles();

    return (
        <Button
            className = {classes.root}
            variant="outlined" >
        {icon}
        {text}
        </Button>
    );
};

export default NavButton;

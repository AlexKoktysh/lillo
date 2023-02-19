import TextField from '@mui/material/TextField';

function Autocomplete(props) {
    const top100Films = [
        { title: 'The Shawshank Redemption', year: 1994 },
        { title: 'The Godfather', year: 1972 },
    ];
    return (
        <Autocomplete
            id="free-solo-demo"
            freeSolo
            options={top100Films.map((option) => option.title)}
            renderInput={(params) => <TextField {...params} label="freeSolo" />}
        />
    );
}

export default Autocomplete;
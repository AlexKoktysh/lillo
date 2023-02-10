function FormCard() {
    return (
        <div>
            <TextField
                id="outlined-select-currency"
                select
                label="Select"
                defaultValue="EUR"
                helperText="Please select your currency"
                >
                {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                    {option.label}
                    </MenuItem>
                ))}
            </TextField>
        </div>
    );
}

export default FormCard;

import { Button, Table } from '@mui/material';
import TextField from '@mui/material/TextField'
import React, { Fragment } from "react";


function SearchRepositories()  {
    const [name, setName] = React.useState('');
    const [result, setResult] = React.useState("");
    const handleChange = (event) => {
        setName(event.target.value);
    }
    const [sortedField, setSortedField] = React.useState(null);

    function handleSubmit(name) {
        fetch(`http://api.github.com/search/repositories?q=${name}`)
            .then(res => res.json())
            .then(
                (result) => {
                    setResult(result);
                },
                (error) => {
                    setResult(error);
                });
    }
    function sortArray(item) {
        if (item !== null) {
            item.sort((a, b) => {
                if (sortedField == "Full Path") {
                    if (a.full_name.toUpperCase() < b.full_name.toUpperCase()) {
                        return -1;
                    }
                    if (a.full_name.toUpperCase() > b.full_name.toUpperCase()) {
                        return 1;
                    }
                    return 0;
                }
                if (sortedField == "Repository Name") {
                    if (a.name.toUpperCase() < b.name.toUpperCase()) {
                        return -1;
                    }
                    if (a.name.toUpperCase() > b.name.toUpperCase()) {
                        return 1;
                    }
                    return 0;
                }
                if (sortedField == "Owner Login") {
                    if (a.owner.login.toUpperCase() < b.owner.login.toUpperCase()) {
                        return -1;
                    }
                    if (a.owner.login.toUpperCase() > b.owner.login.toUpperCase()) {
                        return 1;
                    }
                    return 0;
                }

            });
        }
        return item;
    }

    function populateTable() {
        var item = populateArray();
        item = sortArray(item);

        return item.map((item) => {
            return <tr><td>{item.full_name}</td><td>{item.name}</td><td>{item.owner.login}</td></tr>
        })
    }

    function populateArray() {
        var rows = [];
        for (var i = 0; i < result.items.length; i++) {
            if (result) {
                rows.push(result.items[i])
            }
            else {
                rows.push("no result");
            }
        }
        return rows;
    }

    function tableResult() {

        if (result) {
            return <table id = "Table-Data">
                <tbody>
                    <tr>
                        <th>
                            <button id="Sort-Button" type="button" onClick={() => setSortedField('Full Path')}>
                                Full Path
                            </button>
                        </th>
                        <th>
                            <button id="Sort-Button" type="button" onClick={() => setSortedField('Repository Name')}>
                                Repository Name
                            </button>
                        </th>
                        <th>
                            <button id="Sort-Button" type="button" onClick={() => setSortedField('Owner Login')}>
                                Owner Login
                            </button>
                        </th>
                    </tr>
                    {populateTable()}
                </tbody>
            </table>
        }
        else {
            return <div id = "No-Result">No Results</div>
        }
    }

    return <div>
        <TextField id="standard-basic"
        label="Repository Name" variant="standard"
        value={name}
        onChange={handleChange}
        />
        <Button id = "Search-Button" onClick={() => handleSubmit(name)}>Search</Button>
        {tableResult()}

    </div>
}

export default SearchRepositories;
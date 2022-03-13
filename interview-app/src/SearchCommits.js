
import { Button, Table } from '@mui/material';
import TextField from '@mui/material/TextField'
import React, { Fragment } from "react";


function SearchCommits() {
    const [name, setName] = React.useState('');
    const [result, setResult] = React.useState("");
    const handleNameChange = (event) => {
        setName(event.target.value);
    }
    const [sortedField, setSortedField] = React.useState(null);

    function handleSubmit(name) {
        fetch(`http://api.github.com/search/commits?q=${name}`)
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
        if (item!== null) {
            item.sort((a, b) => {
                if (sortedField == "Author") {
                    if (a.commit.author.name.toUpperCase() < b.commit.author.name.toUpperCase()) {
                        return -1;
                    }
                    if (a.commit.author.name.toUpperCase() > b.commit.author.name.toUpperCase()) {
                        return 1;
                    }
                    return 0;
                }
                if (sortedField == "Commited Date") {
                    if (a.commit.author.date.toUpperCase() < b.commit.author.date.toUpperCase()) {
                        return -1;
                    }
                    if (a.commit.author.date.toUpperCase() > b.commit.author.date.toUpperCase()) {
                        return 1;
                    }
                    return 0;
                }
                if (sortedField == "Email") {
                    if (a.commit.author.email.toUpperCase() < b.commit.author.email.toUpperCase()) {
                        return -1;
                    }
                    if (a.commit.author.email.toUpperCase() > b.commit.author.email.toUpperCase()) {
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
            return <tr><td>{item.commit.author.date}</td><td>{item.commit.author.name}</td><td>{item.commit.author.email}</td></tr>
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

    function renderTable() {

        if (result) {
            return <table id = "Table-Data">
                <tbody>
                    <tr>
                        <th>
                            <button id = "Sort-Button" type="button" onClick={() => setSortedField('Commited Date')}>
                                Committed Date
                            </button>
                        </th>
                        <th>
                            <button id = "Sort-Button" type="button" onClick={() => setSortedField('Author')}>
                                Author
                            </button>
                        </th>
                        <th>
                            <button id = "Sort-Button" type="button" onClick={() => setSortedField('Email')}>
                                Email
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
            label="Repository Full Name" variant="standard"
            value={name}
            onChange={handleNameChange}
        />
        <Button  id = "Search-Button" onClick={() => handleSubmit(name)}>Search</Button>
        {renderTable()}

    </div>
}

export default SearchCommits;
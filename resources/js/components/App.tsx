import React from 'react';
import Table from './ui/Table';
import { useEffect, useState } from 'react';

import apiConfiguration from './../settings.js';

function App() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const response = await fetch(apiConfiguration.apiEndpoints.allBooks);
            if (!response.ok) {
                throw new Error("Ошибка сервера");
            }

            let data = await response.json();
            setData(data);
        }
        catch (err: any) {
            setError(err.message)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <section>
            <h1 className="text-lg">Books list</h1>
            <Table books={data}></Table>
        </section>
    );
}

export default App;

fetch("/shopping/data/stock-liv.json")
    .then(response => {
        if (!response.ok) {
            throw new Error('network responwse was not ok');
        }
        return response.json();
    })
    .then(data => {
        cargarProductos(data)
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:' ,error);

    });

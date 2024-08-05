const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const sales = [
    { id: 1, billNumber: 'BILL001', unitNumber: 10, clientName: 'Juana de Arco', totalValue: 500 },
    { id: 2, billNumber: 'BILL002', unitNumber: 5, clientName: 'Policarpa Salavarrieta', totalValue: 250 },
    { id: 3, billNumber: 'BILL003', unitNumber: 20, clientName: 'Tutankhamun', totalValue: 1000 },
    { id: 4, billNumber: 'BILL004', unitNumber: 7, clientName: 'Socrates', totalValue: 350 },
    { id: 5, billNumber: 'BILL005', unitNumber: 12, clientName: 'Simón Bolívar', totalValue: 600 }
];

app.get('/total-units', (req, res) => {
    const totalUnits = sales.reduce((sum, sale) => sum + sale.unitNumber, 0);
    res.json({ totalUnits });
});

app.get('/total-value', (req, res) => {
    const totalValue = sales.reduce((sum, sale) => sum + sale.totalValue, 0);
    res.json({ totalValue });
});

app.get('/bill/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const bill = sales.find(sale => sale.id === id);
    res.json(bill);
});

app.get('/clients', (req, res) => {
    const clients = sales.map(sale => ({ id: sale.id, clientName: sale.clientName }));
    res.json(clients);
});

app.post('/bill', (req, res) => {
    const newBill = req.body;
    sales.push(newBill);
    res.status(201).json(newBill);
});

app.put('/decrease-value', (req, res) => {
    const percentage = req.body.percentage / 100;
    sales.forEach(sale => sale.totalValue -= sale.totalValue * percentage);
    res.json(sales);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

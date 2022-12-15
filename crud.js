
const express = require('express');
const app = express();
const PORT = process.env.PORT || 2000;

const students = [
    {
        id:1,
        name: 'solomon',
        major: ' programmer',
        Address: 'Abuja',
        religion: ' christainity',
    },
    {
        id:2,
        name: 'Wisdom',
        major: ' constroction worker',
        Address: 'Port-harcout',
        religion: ' christainity',
    },
    {
        id:1,
        name: 'martins',
        major: ' Mechanich',
        Address: 'Canada',
        religion: ' christainity',
    },
    {
        id:1,
        name: 'david',
        major: ' automobile-elect',
        Address: 'Abuja',
        religion: ' christainity',
    },
    {
        id:1,
        name: 'solohitech',
        major: ' software Developer',
        Address: 'Abuja',
        religion: ' christainity',
    },
]

app.get('/', (req,res) => {
res.send( students )
})


app.listen(PORT, () => console.log(`server running on port ${  PORT }`))
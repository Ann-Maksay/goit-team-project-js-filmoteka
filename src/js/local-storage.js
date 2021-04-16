const key = 'aef9cffb51e8fe7e1c3e621e64df0279';

// Accepts a 'key' for selected.
const load = key => {
    try {
        let serialized = localStorage.getItem(key);
        return (serialized = JSON.parse(serialized) || undefined);
    } catch (err) {
        console.error('Get status error', err);
    }
};

//Accepts a 'key' and 'value'.
const seve = (key, value) => {
    try {
        const serialized = JSON.stringify(value);
        localStorage.setItem(key, serialized);
    } catch (err) {
        console.error('Set status error', err);
    }
};

//Accepts a 'key'
const remove = key => {
    try {
        localStorage.removeItem(key);
    } catch (err) {
        console.error('Remov status error', err);
    }
};




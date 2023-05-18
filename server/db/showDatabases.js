const MongoClient = require('mongodb').MongoClient;

async function showDatabases() {
    // SET YOUR LOCAL URL
    const url = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.7.1";
    const client = new MongoClient(url);

    try {
        await client.connect();
        const adminDb = client.db('admin');
        const databases = await adminDb.admin().listDatabases();

        return databases;
        // console.log('Databases:');
        // databases.databases.forEach(db => {
        //     console.log(`- ${db.name}`);
        // });
    } catch (err) {
        console.error('Помилка при виконанні команди show dbs:', err);
    } finally {
        await client.close();
    }
}

module.exports = {
    showDatabases: showDatabases
};
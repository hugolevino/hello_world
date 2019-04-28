const {BigQuery} = require('@google-cloud/bigquery');

query();

async function query() {

  const bigqueryClient = new BigQuery();

  const query = `SELECT Name
    FROM \`bigdata-bernard.my_new_dataset.my_new_table\`
    LIMIT 5`;
  const options = {
    query: query,
    location: 'US',
  };

  const [job] = await bigqueryClient.createQueryJob(options);
  console.log(`Job ${job.id} started.`);

  const [rows] = await job.getQueryResults();

  console.log('Rows:');
  rows.forEach(row => console.log(row));
  
}

const {BigQuery} = require('@google-cloud/bigquery');
var count_row = 0;
var rows = '';

query();

async function query() {

  const bigqueryClient = new BigQuery();

  const query = `SELECT Name
    FROM \`bigdata-bernard.my_new_dataset.my_new_table\`
    LIMIT 821`;
  const options = {
    query: query,
    location: 'US',
  };

  const [job] = await bigqueryClient.createQueryJob(options);
  console.log(`Job ${job.id} started.`);

  rows = await job.getQueryResults();

  testing();
  
}

function testing(){
	if(count_row < rows[0].length){
		for (i = 0; i < 80; i++) {
			if(count_row < rows[0].length){
				console.log(count_row + ' -> ' + rows[0][i].Name);
				count_row++;
			}
		}
		setTimeout(function(){
			 testing();
		}, 5000);
	}
}

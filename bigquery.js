const {BigQuery} = require('@google-cloud/bigquery');
const cloudTasks = require('@google-cloud/tasks');
const client = new cloudTasks.CloudTasksClient();
const parent = client.queuePath('bigdata-bernard', 'us-central1', 'first-queue');

const task = {
	appEngineHttpRequest: {
    	httpMethod: 'POST',
    	relativeUri: '/listening',
	},
};


var count_row = 0;
var rows = '';

query();

async function query() {

  const bigqueryClient = new BigQuery();

  const query = `SELECT cep
    FROM \`bigdata-bernard.my_new_dataset.ceps\`
    LIMIT 5`;
  const options = {
    query: query,
    location: 'US',
  };

  const [job] = await bigqueryClient.createQueryJob(options);
  console.log(`Job ${job.id} started.`);

  rows = await job.getQueryResults();

  testing();
  
}

async function testing(){
	if(count_row < rows[0].length){
		for (i = 0; i < 80; i++) {
			if(count_row < rows[0].length){
				
				var payload = rows[0][count_row].cep;
				task.appEngineHttpRequest.body = Buffer.from(payload).toString('base64');
				const request = {
				    parent: parent,
				    task: task,
				 };

				 console.log('Sending task:');
				 console.log(task);

				 const [response] = await client.createTask(request);
				 const name = response.name;
				 console.log(`Created task ${name}`);

				count_row++;
			}
		}
		setTimeout(function(){
			 testing();
		}, 5000);
	}
}

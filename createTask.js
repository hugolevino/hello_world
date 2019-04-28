// Imports the Google Cloud Tasks library.
const cloudTasks = require('@google-cloud/tasks');

// Instantiates a client.
const client = new cloudTasks.CloudTasksClient();

// TODO(developer): Uncomment these lines and replace with your values.
 //const project = 'my-project-id';
 //const queue = 'my-appengine-queue';
 //const location = 'us-central1';
 //const options = {payload: 'hello'};

// Construct the fully qualified queue name.
const parent = client.queuePath(project, location, queue);

const task = {
  appEngineHttpRequest: {
    httpMethod: 'POST',
    relativeUri: '/listening',
  },
};

if (options.payload !== undefined) {
  task.appEngineHttpRequest.body = Buffer.from(options.payload).toString(
    'base64'
  );
}

if (options.inSeconds !== undefined) {
  task.scheduleTime = {
    seconds: options.inSeconds + Date.now() / 1000,
  };
}

const request = {
  parent: parent,
  task: task,
};

console.log('Sending task %j', task);
// Send create task request.
const [response] = await client.createTask(request);
const name = response.name;
console.log(`Created task ${name}`);

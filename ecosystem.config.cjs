module.exports = {
  apps: [
    {
      name: 'job-cracker',
      cwd: './',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3000',
      exec_mode: 'cluster',
      instances: 0,
      autorestart: true,
      listen_timeout: 50000,
      kill_timeout: 5000,
    },
  ],
};

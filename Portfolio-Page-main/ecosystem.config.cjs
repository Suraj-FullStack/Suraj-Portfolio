/**
 * PM2 ecosystem – starts both backend (Django API) and frontend (static server).
 */
module.exports = {
  apps: [
    {
      name: 'portfolio-api',
      script: 'python',
      args: 'manage.py runserver 0.0.0.0:8000',
      cwd: '/home/user/suraj-portfolio/backend',
      instances: 1,
      exec_mode: 'fork',
      watch: false,
    },
    {
      name: 'portfolio-frontend',
      script: 'python',
      args: 'server.py',
      cwd: '/home/user/suraj-portfolio/frontend',
      instances: 1,
      exec_mode: 'fork',
      watch: false,
    },
  ],
};

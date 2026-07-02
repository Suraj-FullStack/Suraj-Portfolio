module.exports = {
  apps: [{
    name: 'portfolio-api',
    script: 'python',
    args: 'manage.py runserver 0.0.0.0:8000',
    cwd: '/home/user/suraj-portfolio/backend',
    instances: 1,
    exec_mode: 'fork',
    watch: false,
  }],
};

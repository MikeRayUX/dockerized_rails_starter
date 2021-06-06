# Starter pack for Ruby on Rails 6+

## Getting Started

1. Set the permissions for `docker_entrypoint.sh` and `webpack-dev-server` files

```bash
chmod u+x docker_entrypoint.sh
chmod +x app/bin/webpack-dev-server
```

2. Build docker containers and project

```bash
docker-compose down --remove orphans &&
docker-compose build &&
docker-compose run app yarn install --check-files &&
docker-compose run app bundle install &&
```

3. Create/migrate database

```bash
docker-compose run app bundle exec rails db:create &&
docker-compose run app bundle exec rails db:migrate &&
docker-compose run app bundle exec rails db:seed &&
```

4. Remove any orphan containers from the build process and start the Rails Server

```bash
docker-compose down --remove orphans &&
docker-compose up --remove-orphans
```

### Troubleshooting

**problem**:

```bash
Error response from daemon: OCI runtime create failed: container_linux.go:370: starting container process caused: exec: "./docker_entrypoint.sh": permission denied: unknown
```

**solution**: `chmod u+x docker_entrypoint.sh`

**problem**:
`bash: /usr/src/app/bin/webpack-dev-server: /usr/bin/env: bad interpreter: Permission denied`

**solution**: `chmod +x app/bin/webpack-dev-server`

**Still having issues getting this project working with docker and want an easy way to reset your docker containers/images/volumes?**
Consider creating an alias to quickly perform a hardrebuild on your project containers making it quicker to diagnose and fix errors:

```bash
# ~/.zshrc
# Warning: this will remove docker containers/images/volumes globally on your machine use at your own risk.
alias hardrebuild="
  docker-compose down --remove orphans &&
  docker system prune -a -f &&
  docker volume prune -f &&
  docker-compose build &&
  docker-compose run app yarn install --check-files &&
  docker-compose run app bundle install &&
  docker-compose run app bundle exec rails db:create &&
  docker-compose run app bundle exec rails db:migrate &&
  docker-compose run app bundle exec rails db:seed &&
  docker-compose down --remove orphans &&
  docker-compose up --remove-orphans
  "
```

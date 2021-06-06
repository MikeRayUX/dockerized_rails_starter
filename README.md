# Dockerized Ruby on Rails 6+ Starter Pack

## Getting Started (Setting up Docker)

1. **Set the permissions for `docker_entrypoint.sh` and `webpack-dev-server` files**

```bash
chmod u+x docker_entrypoint.sh
chmod +x app/bin/webpack-dev-server
```

2. **Build docker containers and project**

```bash
docker-compose down --remove orphans &&
docker-compose build &&
docker-compose run app yarn install --check-files &&
docker-compose run app bundle install
```

3. **Create/migrate database**

```bash
docker-compose run app bundle exec rails db:create &&
docker-compose run app bundle exec rails db:migrate &&
docker-compose run app bundle exec rails db:seed &&
```

4. **Remove any orphan containers from the build process and start the Rails Server**

```bash
docker-compose down --remove orphans &&
docker-compose up --remove-orphans
```

5. **Access the app from http://localhost:3000/. You should now be greeted with the standard demo page **

---

## Setting up the App

**Configure `application.html.erb` layout and the various `layouts/headers/*` partials for numerous seo services/fonts/icons/e.t.c** below is a breakdown of each partial and their use:

1. `_seo_meta_tags.html.erb`: used for search engines and preview-card linking when sharing links on social media. Replace the `Add something here..` with your own information
2. `_font_import_links.html.erb`: Include any fonts from any CDN (default is OpenSans from Google Fonts)
3. `_ionicons.html.erb`: Optional Ionicons import from CDN. use `<ion-icon class="tailwind-classes-here" name="person"></ion-icon>` syntax in your `html.erb` or `.js` react files or remove if you don't want to use it.

### Common Errors & Troubleshooting

**error**:

```bash
Error response from daemon: OCI runtime create failed: container_linux.go:370: starting container process caused: exec: "./docker_entrypoint.sh": permission denied: unknown
```

**solution**: `chmod u+x docker_entrypoint.sh`

**error**:
`bash: /usr/src/app/bin/webpack-dev-server: /usr/bin/env: bad interpreter: Permission denied`

**solution**: `chmod +x app/bin/webpack-dev-server`

**Having issues with Docker setup and want an easy way to reset your docker containers/images/volumes while you debug?**

- Create an alias to quickly perform a hard-rebuild on your project containers making it quicker to diagnose, iterate and fix errors:

```bash
# ~/.zshrc
# WARNING: this will remove docker containers/images/volumes
# globally on your machine!! USE AT YOUR OWN RISK!
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

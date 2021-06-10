# Dockerized Ruby on Rails 6+ Starter Pack

What's worse than having a great idea for an app, and instead of being able to jump right into building, you become immediately stuck in a tar pit configuring all of the necessary features/libraries/gems needed to hit the ground running like: `devise-cookie-auth`, `jwt-auth`, `front-end-library`, e.t.c.

This starter pack is [dockerized](https://developerexperience.io/practices/dockerizing) by default and contains pre-configured libraries, gems, and reasonable defaults.

**List of default included libraries/configurations**

- [React with Webpacker-only configuration](https://github.com/rails/webpacker) - Ready to create/link react components in your views with `<%= javascript_pack_tag 'path/to/MyComponent' %>`. Webpacker is ran as a `service` in `docker-compose.yml`
- [rspec-rails](https://github.com/rspec/rspec-rails) - preferred testing framework over `minitest`
- [factory_bot_rails](https://github.com/thoughtbot/factory_bot_rails) - The only fixtures replacement worth using with rails.
- [mailcatcher](https://github.com/sj26/mailcatcher/) - ran as a `service` in `docker-compose.yml` and can be accessed at [http://localhost:1080](http://localhost:1080)
- [devise](https://github.com/heartcombo/devise) - flexible/easy to configure cookie auth with an included `User` model and customized devise views
- **jwt-auth** - A roll-your-own jwt authentication solution that handles registering/sessions/forgot_password via api calls to an `ApiController` **NOTE: as of writing this, this is unfinished and does not yet include a revocation strategy or refresh tokens making this less secure than a mature solution like devise-jwt. Use at your own risk!!**

It's likely that your preferred libraries differ from what's included here. You are encouraged to fork this repo, customize it an make it your own.

### Setup Step 1.: Personalize/rename this project and setup a new git repository

1. **Clone the project:**

```bash
git clone git@github.com:MichaelArriaga/dockerized_rails_starter.git
```

2. **Rename the project folder to your desired project name**

```bash
mv dockerized_rails_starter/ my_new_awsome_project
```

3. **Replace and setup a git repository**

   1. Remove the existing git repository: `cd my_new_awsome_project && rm -rf .git`
   2. Initialize a new git repository `git init`
   3. Create a new project on github
   4. Use standard remote repository setup instructions from github to push your new project to the new remote repository `git push -u origin master`

### Setup Step 2.: Docker Setup/Configuration

1. **Set the permissions for `docker_entrypoint.sh` and `webpack-dev-server` files**

```bash
chmod u+x docker_entrypoint.sh
chmod +x app/bin/webpack-dev-server
```

2. **Build docker containers and services**

```bash
docker-compose down &&
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
docker-compose down &&
docker-compose up --remove-orphans
```

5. **All done. Now you can access the app from [http://localhost:3000/](http://localhost:3000/)**

**OPTIONAL: Do steps 2-4 all at once in a single chain of commands**:

```bash
docker-compose down &&
docker-compose build &&
docker-compose run app yarn install --check-files &&
docker-compose run app bundle install
docker-compose run app bundle exec rails db:create &&
docker-compose run app bundle exec rails db:migrate &&
docker-compose run app bundle exec rails db:seed &&
docker-compose down &&
docker-compose up --remove-orphans

```

---

### Setup Step3.: Configure your Rails App

1. `application.html.erb`:

Configure/customize the `application.html.erb` layout and the various `layouts/headers/*` header partials included in it for numerous seo services/fonts/icons/e.t.c.

Below is a breakdown of each partial and their use:

- `_seo_meta_tags.html.erb`: used for search engines and preview-card linking when sharing links on social media. Replace the `"Add something here.."` with your own data
- `_font_import_links.html.erb`: Include any fonts from any CDN (default is OpenSans from Google Fonts)
- `_ionicons.html.erb`: Optional Ionicons import from CDN. use `<ion-icon name="person"></ion-icon>` syntax in your `html.erb` or `.js` react files or remove entirely if you don't want to use it. The icon tag also supports tailwind classes

2. Replace `favicon.png` and `preview-card.png`:

- `app/assets/images/favicon.png`: is the little icon that appears in the browser tab or as the icon for a bookmark in your browsers toolbar. a favicon should be `96x96` pixels in size.
- `app/assets/images/preview-card.png`: is the preview image card that is generated by default when your website is shared on social media or in other places such as a text message on a phone for instance. It's common for preview cards to be generated automatically to match the content of the page that's being shared but in this case we will stick with a standard generic perview-card image. The size of a preview card must be at least `2361x1000` pixels in size. It is also recommended that you optimize your preview-card image to reduce it's size. `image-optim` works well. Google it.

3. Add a React component to a view

- create a component file ex:`app/javascript/packs/components/MyComponent.js`
- Link to it inside a view:

```erb
#app/views/static_pages/landing_pages/index.html.erb
<%= javascript_pack_tag 'src/components/SampleComponent'%>
```

---

#### Common Errors & Troubleshooting

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
  docker-compose down &&
  docker system prune -a -f &&
  docker volume prune -f &&
  docker-compose build &&
  docker-compose run app yarn install --check-files &&
  docker-compose run app bundle install &&
  docker-compose run app bundle exec rails db:create &&
  docker-compose run app bundle exec rails db:migrate &&
  docker-compose run app bundle exec rails db:seed &&
  docker-compose down &&
  docker-compose up --remove-orphans
  "
```

---

# Mailer Configuration

At some point, you will want to send emails in the real world. You can view emails sent in development environment through the `:mailcatcher` docker service accessed at: [http://localhost:1080/](http://localhost:1080/) when docker-compose is running.

You must first configure your email service, and the `from` line in the devise forgot password mailer:

- Navigate to `config/initializers/devise.rb` and edit the following line to customzie the subject line in the forgot password mailer:

```ruby
config.mailer_sender = 'please-change-me-at-config-initializers-devise@example.com'
```

- **Set up your email service api credentials (default used is sendgrid)**

```ruby
#environment.rb
if Rails.env.production?
	# Settings for sendgrid LIVE
	ActionMailer::Base.smtp_settings = {
		user_name: 'apikey',
		password: 'SENDGRID_API_KEY',
		domain: 'SENDGRID_DOMAIN',
		address: 'SENDGRID_ADDRESS',
		port: 587,
		authentication: :plain,
		enable_starttls_auto: true
	}
else
	# Settings for mailcatcher TEST
	ActionMailer::Base.smtp_settings = {
	address: "mailcatcher",
	port: 1025
	}
end
```

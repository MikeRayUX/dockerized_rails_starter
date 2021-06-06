FROM ruby:3.0.1

RUN mkdir /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app

# install latest node
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash  && \
  apt-get install nodejs -yq && \
  # docker-compose run --rm -e EDITOR=nano app bin/rails credentials:edit to edit credentials
  apt-get update -qq && \
  apt-get install -y nano && \
  # remove cmdtest to fix yarn install error
  apt-get remove cmdtest && \
  # install yarn
  curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
  echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
  apt-get update && apt-get install yarn && \
  # install postgres client
  apt-get update -qq && \ 
  apt-get install -y nodejs postgresql-client && \
  # fixes 'you must use bundler 2 or higher with this lockfile'
  gem update --system && gem install bundler && \
  bundler update --bundler && \ 
  bundle install && \
  yarn install --check-files && \
  # fix permissions for docker_entrypoint.sh
  chmod +x docker_entrypoint.sh

COPY docker_entrypoint.sh /usr/bin/
# Add a script to be executed every time the container starts.
ENTRYPOINT ["./docker_entrypoint.sh"]
EXPOSE 3000

# Start the main process.
CMD ["rails", "server", "-b", "0.0.0.0", "--pid=/tmp/server.pid"]
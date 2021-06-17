# frozen_string_literal: true
require 'spec_helper'
require 'rails_helper'

RSpec.describe 'static_pages/landing_pages_controller', type: :request do
  before do
    ActionMailer::Base.deliveries.clear
    DatabaseCleaner.clean_with(:truncation)
  end

  after do
    ActionMailer::Base.deliveries.clear
    DatabaseCleaner.clean_with(:truncation)
  end

  scenario 'landing page contains sign up link' do
    get root_path

    page = response.body

    expect(page).to include 'MyApp'
  end
end